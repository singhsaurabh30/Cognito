import { useGetCourseDetailWithStatusQuery } from '@/features/api/purchaseApi';
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

const PurchaseCourseProtectedRoute = ({children}) => {
  const {courseId}=useParams();
  const {data,isLoading}=useGetCourseDetailWithStatusQuery(courseId);
  if(isLoading) return <p>Loading...</p>
  return data?.purchased?children:<Navigate to={`/course-detail/${courseId}`}/>

}

export default PurchaseCourseProtectedRoute