import DisplayMembers from '@/features/team/DisplayMembers';
import useTitle from '@/hooks/useTitle';

function Team({ heading }: { heading: { title: string; subTitle: string } }) {
  useTitle(heading);
  return <DisplayMembers />;
}

export default Team;
