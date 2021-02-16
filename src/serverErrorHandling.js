import axios from 'axios';
import { toast } from 'react-semantic-toasts';

axios.interceptors.response.use(
  response => response,
  () => toast({
    type: 'error',
    title: 'Error',
    description: 'Unknown server error',
    animation: 'fly left',
    size: 'massive',
    time: 0
  })
);
