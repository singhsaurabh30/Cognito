import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  useCreateLectureMutation,
  useGetCourseLectureQuery,
} from "@/features/api/courseApi";
import { toast } from "sonner";
import { Lecture } from "./Lecture";

const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const courseId = params.courseId;
  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();
  const {
    data: getCourseLectureData,
    isLoading: getCourseLectureLoading,
    error: getCourseLectureError,
    refetch
  } = useGetCourseLectureQuery(courseId);
  const handleCreateLecture = async () => {
    await createLecture({ lectureTitle, courseId });
  };
  useEffect(() => {
    if (isSuccess) {
        refetch();
      toast.success(data.message || "Lecture Created SucccessFully");
    }
    if (error) {
      toast.error(error.data.message || "Unable to create Lecture");
    }
  }, [isSuccess, error]);
  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-xl">
          Let's add lectures, add some basic details for your new lecture
        </h1>
        <p className="text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
          laborum!
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Your Course Name"
            value={lectureTitle}
            onChange={(e) => {
              setLectureTitle(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </Button>
          <Button disabled={isLoading} onClick={handleCreateLecture}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </Button>
        </div>
        <div className="mt-10">
          {getCourseLectureLoading ? (
            <p>Loading lectures...</p>
          ) : getCourseLectureError ? (
            <p>Failed to load lectures.</p>
          ) : getCourseLectureData.lectures.length === 0 ? (
            <p>No lectures availabe</p>
          ) : (
            getCourseLectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
