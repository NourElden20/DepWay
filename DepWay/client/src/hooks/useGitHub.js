import { useState, useEffect } from 'react';
import { githubAPI } from '../utils/api';
import { toast } from 'react-toastify';

export const useGitHub = (token) => {
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await githubAPI.getUser(token);
      setUser(response.data);
    } catch (error) {
      setError('فشل في جلب معلومات المستخدم');
      console.error('Error fetching user:', error);
    }
    
    setLoading(false);
  };

  const fetchRepos = async () => {
    if (!token) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await githubAPI.getRepos(token);
      setRepos(response.data);
      toast.success(`تم جلب ${response.data.length} مشروع بنجاح`);
    } catch (error) {
      setError('فشل في جلب المشاريع');
      toast.error('فشل في جلب المشاريع: ' + error.response?.data?.error);
    }
    
    setLoading(false);
  };

  const fetchRepoDetails = async (owner, repo) => {
    if (!token) return;
    
    try {
      const response = await githubAPI.getRepo(owner, repo, token);
      return response.data;
    } catch (error) {
      console.error('Error fetching repo details:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (token) {
      fetchUser();
    }
  }, [token]);

  return {
    repos,
    user,
    loading,
    error,
    fetchRepos,
    fetchRepoDetails,
    setRepos,
    setUser
  };
};

export default useGitHub;
