import { useParams, useSearchParams } from 'react-router-dom';
import RequestDetail from '@/components/helper/Matching/RequestDetail';
import CompleteDetail from '@/components/helper/Matching/CompleteDetail';

export default function MatchingDetail() {
  const patientSeq = useParams().patientSeq;
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status'); // request, complete

  if (status === 'request') return <RequestDetail patientSeq={patientSeq} />;
  if (status === 'complete') return <CompleteDetail patientSeq={patientSeq} />;
}
