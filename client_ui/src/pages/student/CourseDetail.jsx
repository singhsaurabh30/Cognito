import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeInfo, PlayCircle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";
import BuyCourseButton from "@/components/BuyCourseButton";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";
import ReactPlayer from "react-player";

const CourseDetail = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(
    params.courseId
  );

  if (isLoading) return <h1 className="text-center font-semibold text-xl">Loading...</h1>;
  if (isError) return <h1 className="text-center font-semibold text-xl text-red-600">Failed to get course details</h1>;

  return (
    <div className="mt-16 space-y-8">
      {/* Course Header Section */}
      <div className="bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 from-indigo-600 to-blue-500 text-white p-6 rounded-lg shadow-lg">
        <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-4">
          <h1 className="font-extrabold text-3xl md:text-4xl dark:text-white">{data?.course.courseTitle}</h1>
          <p className="text-lg md:text-xl dark:text-gray-300">{data?.course.subTitle}</p>
          <p>
            Created By{" "}
            <span className="text-[#C0C4FC] underline italic dark:text-[#C0C4FC]">
              {data?.course.creator.name}
            </span>
          </p>
          <div className="flex items-center gap-2 text-sm dark:text-gray-400">
            <BadgeInfo size={16} />
            <p>Last updated {data?.course?.createdAt.split("T")[0]}</p>
          </div>
          <p className="text-sm dark:text-gray-400">Students enrolled: {data?.course?.enrolledStudents.length}</p>
        </div>
      </div>

      {/* Course Content and Purchase Section */}
      <div className="max-w-7xl mx-auto my-8 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-12">
        {/* Course Description and Content */}
        <div className="w-full lg:w-2/3 space-y-6">
          <h1 className="font-bold text-2xl md:text-3xl dark:text-white">Course Description</h1>
          <p
            className="text-sm md:text-base dark:text-gray-300"
            dangerouslySetInnerHTML={{ __html: data?.course.description }}
          />
          <Card className="shadow-lg dark:bg-gray-800 dark:text-white">
            <CardHeader>
              <CardTitle className="dark:text-white">Course Content</CardTitle>
              <CardDescription className="dark:text-gray-400">4 lectures</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {data?.course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm dark:text-gray-300">
                  <span>{true ? <PlayCircle size={16} /> : <Lock size={16} />}</span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Course Video and Purchase Button */}
        <div className="w-full lg:w-1/3">
          <Card className="shadow-lg dark:bg-gray-800 dark:text-white">
            <CardContent className="p-4 flex flex-col">
              <div className="w-full aspect-video mb-6">
                <ReactPlayer
                  width="100%"
                  height="100%"
                  url={data?.course.lectures[0].videoUrl}
                  controls={true}
                />
              </div>
              <h2 className="font-semibold text-xl dark:text-white">{data?.course.lectures[0].lectureTitle}</h2>
              <Separator className="my-4 dark:border-gray-600" />
              <h3 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-gray-100">
                Course Price: ₹{data?.course.coursePrice}
              </h3>
            </CardContent>
            <CardFooter className="flex justify-center p-4">
              {data?.purchased ? (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => {
                    if (data?.purchased) navigate(`/course-progress/${params.courseId}`);
                  }}
                >
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={params.courseId} />
              )}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
