import { useParams, useSearchParams } from 'react-router-dom';
import RequestDetail from '@/components/helper/Matching/RequestDetail';
import CompleteDetail from '@/components/helper/Matching/CompleteDetail';

export default function MatchingDetail() {
  const patientLogSeq = useParams().patientLogSeq;
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status'); // request, complete
  const returnPath = searchParams.get('return');

  if (status === 'request')
    return <RequestDetail patientLogSeq={patientLogSeq} returnPath={returnPath} />;
  if (status === 'complete')
    return <CompleteDetail patientLogSeq={patientLogSeq} returnPath={returnPath} />;
}
