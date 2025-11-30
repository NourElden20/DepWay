import { useState, useEffect } from 'react';
import { dockerAPI } from '../utils/api';
import { toast } from 'react-toastify';

export const useDocker = () => {
  const [images, setImages] = useState([]);
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await dockerAPI.getImages();
      setImages(response.data);
    } catch (error) {
      setError('فشل في جلب صور Docker');
      console.error('Error fetching images:', error);
    }
    
    setLoading(false);
  };

  const fetchContainers = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await dockerAPI.getContainers();
      setContainers(response.data);
    } catch (error) {
      setError('فشل في جلب الـ containers');
      console.error('Error fetching containers:', error);
    }
    
    setLoading(false);
  };

  const dockerizeProject = async (projectData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await dockerAPI.dockerize(projectData);
      toast.success('تم تحويل المشروع إلى Docker بنجاح!');
      return response.data;
    } catch (error) {
      setError('فشل في تحويل المشروع');
      toast.error('فشل في تحويل المشروع: ' + error.response?.data?.error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const startContainer = async (containerId) => {
    try {
      await dockerAPI.startContainer(containerId);
      toast.success('تم تشغيل الـ container بنجاح');
      fetchContainers();
    } catch (error) {
      toast.error('فشل في تشغيل الـ container');
      console.error('Error starting container:', error);
    }
  };

  const stopContainer = async (containerId) => {
    try {
      await dockerAPI.stopContainer(containerId);
      toast.success('تم إيقاف الـ container بنجاح');
      fetchContainers();
    } catch (error) {
      toast.error('فشل في إيقاف الـ container');
      console.error('Error stopping container:', error);
    }
  };

  const refreshAll = async () => {
    await Promise.all([fetchImages(), fetchContainers()]);
  };

  useEffect(() => {
    refreshAll();
  }, []);

  return {
    images,
    containers,
    loading,
    error,
    fetchImages,
    fetchContainers,
    dockerizeProject,
    startContainer,
    stopContainer,
    refreshAll
  };
};

export default useDocker;
