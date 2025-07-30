import { formatDistanceToNow } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Organisation } from './types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';

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
          className=" flex flex-col xl:flex-row text-lg cursor-pointer gap-4 justify-center items-center h-40 hover:bg-gray-50 w-[400px]"
        >
          <CardContent>
            <Avatar>
              <AvatarImage src={org.avatar as string} />
              <AvatarFallback>
                {org.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>

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
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default SelectOrganisation;
