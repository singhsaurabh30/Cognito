import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";
import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const CourseProgress = () => {
  const params = useParams();
  const [currentLecture, setCurrentLecture] = useState(null);
  const { courseId } = params;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);
  const [updateLectureProgress, {}] = useUpdateLectureProgressMutation();
  const [
    markAsCompleted,
    { data: completedData, isSuccess: completedSuccess },
  ] = useCompleteCourseMutation();
  const [
    markAsInCompleted,
    { data: inCompletedData, isSuccess: inCompletedSuccess },
  ] = useInCompleteCourseMutation();
  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(completedData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(inCompletedData.message);
    }
  }, [completedSuccess,inCompletedSuccess]);
  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Failed to load course progress</h1>;

  const { courseDetails, progress, completed } = data;
  const initialLecture =
    currentLecture || (courseDetails.lectures && courseDetails.lectures[0]);
  const isLectureComplete = (lectureId) => {
    return progress.some(
      (currLecture) => currLecture.lectureId === lectureId && currLecture.viewed
    );
  };
  const updateLectureProgressHandler = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };
  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    updateLectureProgressHandler(lecture._id);
  };
  const completeMarkHandler=async()=>{
    await markAsCompleted(courseId);
  }
  const inCompleteMarkHandler=async()=>{
    await markAsInCompleted(courseId);
  }
  console.log(data);

  return (
    <div className="max-w-7xl mx-auto p-4 mt-20">
      {/* Display course name  */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">{courseDetails.courseTitle}</h1>
        <Button onClick={completed ? inCompleteMarkHandler : completeMarkHandler}
          variant={completed ? "outline" : "default"}>
          {completed ? (
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" /> <span>Completed</span>{" "}
            </div>
          ) : (
            "Mark as completed"
          )}
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 md:w-3/5 h-fit rounded-lg shadow-lg p-4">
          {/* Video section  */}
          <div>
            <video
              src={currentLecture?.videoUrl || initialLecture.videoUrl}
              controls
              className="w-full h-auto md:rounded-lg"
              onPlay={() =>
                updateLectureProgressHandler(
                  currentLecture?._id || initialLecture._id
                )
              }
            />
          </div>
          {/* Display current watching lecture title */}
          <div className="mt-2 ">
            <h3 className="font-medium text-lg">{`Lecture ${
              courseDetails.lectures.findIndex(
                (lec) => lec._id === (currentLecture?._id || initialLecture._id)
              ) + 1
            } : ${
              currentLecture?.lectureTitle || initialLecture.lectureTitle
            }`}</h3>
          </div>
        </div>
        {/* Lecture Sidebar  */}
        <div className="flex flex-col w-full md:w-2/5 border-t md:border-t-0 md:border-l border-gray-200 md:pl-4 pt-4 md:pt-0">
          <h2 className="font-semibold text-xl mb-4">Course Lecture</h2>
          <div className="flex-1 overflow-y-auto">
            {courseDetails.lectures.map((lecture, index) => (
              <Card
                key={lecture._id}
                className={`mb-3 hover:cursor-pointer transition transform ${
                  lecture._id === currentLecture?._id
                    ? "bg-gray-200 dark:dark:bg-gray-800"
                    : ""
                } `}
                onClick={() => handleSelectLecture(lecture)}
              >
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    {isLectureComplete(lecture._id) ? (
                      <CheckCircle2 size={24} className="text-green-500 mr-2" />
                    ) : (
                      <CirclePlay size={24} className="text-gray-500 mr-2" />
                    )}
                    <div>
                      <CardTitle className="text-lg font-medium">
                        {lecture.lectureTitle}
                      </CardTitle>
                    </div>
                  </div>
                  {isLectureComplete(lecture._id) && (
                    <Badge
                      variant={"outline"}
                      className="bg-green-200 text-green-600"
                    >
                      Completed
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
