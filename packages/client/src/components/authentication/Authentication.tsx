import { useHealthCheckQuery } from '../../generated/graphql';
import { toast } from 'react-toastify';

export const Authentication = () => {
  const { data, loading, error } = useHealthCheckQuery();

  if (loading) {
    return <div>loading</div>;
  }
  if (error) {
    toast.error('Error: ' + JSON.stringify(error));
    return <div>error: data: {JSON.stringify(error)}</div>;
  }
  return <div>{data?.healthCheck}</div>;
};
