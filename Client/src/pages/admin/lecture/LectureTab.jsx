import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVedioInfo, setUploadVedioInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const MEDIA_URL = "http://localhost:3000/api/v1/media";
  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    {
      data: removeLectureData,
      isSuccess: removeLectureSuccess,
      error: removeLectureError,
    },
  ] = useRemoveLectureMutation();
  const params = useParams();
  const { courseId, lectureId } = params;
  const {data:lectureData}=useGetLectureByIdQuery(lectureId);
  const lecture=lectureData?.lecture;
  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_URL}/upload-vedio`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
        });
        if (res.data.success) {
          console.log(res);
          setUploadVedioInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("vedio upload failed");
      } finally {
        setMediaProgress(false);
      }
    }
  };
  const editLectureHandler = async () => {
    console.log(lectureTitle, uploadVedioInfo, isFree);
    await editLecture({
      lectureTitle,
      videoInfo: uploadVedioInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };
  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error?.data.message);
    }
    
  }, [isSuccess, error]);
  useEffect(()=>{
    if(removeLectureSuccess){
      toast.success(removeLectureData.message);
    }
    if(removeLectureError){
      toast.error(removeLectureError.data.message);
    }
  },[removeLectureSuccess,removeLectureError])
  useEffect(()=>{
    if(lecture){
      setLectureTitle(lecture.lectureTitle);
      setIsFree(lecture.isPreviewFree);
      setUploadVedioInfo(lecture.videoInfo)
    }
  },[lecture])
  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={removeLectureHandler} variant="destructive">
            Remove Lecture
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            placeholder="Ex. Introduction to Javascript"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>
        {mediaProgress && (
          <div className="my-4">
            <Progress value={uploadProgress} />
            <p>{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="mt-4">
        <Button disabled={isLoading} onClick={editLectureHandler}>
              {
                isLoading ? <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                Please wait
                </> : "Update Lecture"
              }
            
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
