import MatchingCard from '@/components/ui/custom/MatchingCard/MatchingCard';
import ElderProfile from '@/components/ui/custom/MatchingCard/ElderProfile';
import MatchedCaregiver from '@/components/ui/custom/MatchingCard/MatchedCaregiver';

export default function ElderCard({ elderInfo }) {
  const matchedCaregiver = elderInfo.matchedHelperInfos;

  return (
    <MatchingCard>
      <ElderProfile elderInfo={elderInfo} />
      <MatchedCaregiver caregiverInfo={matchedCaregiver} />
    </MatchingCard>
  );
}
