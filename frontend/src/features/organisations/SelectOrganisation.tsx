import { Card } from '@/ui/shadcn/ui/card';
import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Organisation } from './types';
import { AvatarFallback, AvatarImage } from '@/ui/Avatar';

function SelectOrganisation({
  organisations,
}: {
  organisations: [Organisation];
}) {
  const navigate = useNavigate();
  return (
    <>
      {organisations?.map((org: Organisation) => (
        <Card
          onClick={() => navigate(`${org._id}`)}
          key={org.name}
          className="flex flex-col xl:flex-row text-lg cursor-pointer gap-4 justify-center items-center h-40 xl:w-96 xl:h-32 hover:bg-accent"
        >
          {org.avatar ? (
            <AvatarImage src={org.avatar} className="size-12 rounded-full" />
          ) : (
            <AvatarFallback className="size-12 rounded-full">
              {org.name.charAt(0)}
            </AvatarFallback>
          )}

          <div>
            <p>{org.name}</p>
            {org.updatedAt && (
              <p className="text-sm text-muted-foreground">
                {formatDistanceToNow(new Date(org.updatedAt), {
                  addSuffix: true,
                })}
              </p>
            )}
          </div>
        </Card>
      ))}
    </>
  );
}

export default SelectOrganisation;
