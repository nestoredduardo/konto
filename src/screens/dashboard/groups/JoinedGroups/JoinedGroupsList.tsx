// Libraries
import toast from 'react-hot-toast';
import { Button, Text, Collapse, Card } from '@nextui-org/react';

// Types
import { JoinedGroup } from 'request/prisma/userGroups/getJoinedGroups';

// Helpers
import mapServiceToImage from 'lib/mapServiceToImage';
import { formatDate } from 'lib/formatData';
import classNames from 'lib/classNames';

interface IJoinedGroupsListProps {
  joinedGroups: JoinedGroup[];
}

const JoinedGroupsList: React.FC<IJoinedGroupsListProps> = ({
  joinedGroups,
}) => {
  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    toast.success('Email copiado al portapapeles');
  };

  const handleCopyPassWord = (password: string) => {
    navigator.clipboard.writeText(password);
    toast.success('Contraseña copiada al portapapeles');
  };

  return (
    <div className="flex flex-col gap-4">
      {joinedGroups.map((joinedGroup) => {
        return (
          <div
            key={joinedGroup.id}
            className="flex flex-col px-4 py-6 border rounded-md shadow-sm"
          >
            <div className="flex mb-4">
              <p className="text-center text-2xl text-primary font-semibold">
                {joinedGroup.group.plan.service.name}
              </p>
              <Button
                light
                size="sm"
                auto
                color={joinedGroup.state === 'PENDING' ? 'warning' : 'success'}
                className="ml-auto"
              >
                {joinedGroup.state === 'PENDING' ? 'Validando pago' : 'Activo'}
              </Button>
            </div>

            <div className="flex gap-4">
              <img
                src={mapServiceToImage(joinedGroup.group.plan.service.value)}
                alt="Service"
                className="w-20 h-20 object-cover rounded-lg"
              />
              <Text blockquote className="w-full">
                {joinedGroup.state === 'PENDING' ? (
                  <p className="text-center">
                    Validando tu pago de S/ {joinedGroup.group.plan.joinerPay}
                  </p>
                ) : (
                  <div>
                    <p>Inicio: {formatDate(joinedGroup.joinedAt)}</p>
                    <p>Fin: {formatDate(joinedGroup.periodEnd)}</p>
                  </div>
                )}
              </Text>
            </div>
            <Collapse.Group>
              <Collapse
                disabled={joinedGroup.state === 'PENDING' && true}
                title={
                  <p
                    className={classNames(
                      joinedGroup.state === 'PENDING'
                        ? 'text-gray-500'
                        : 'text-gray-800',
                      'font-semibold text-lg'
                    )}
                  >
                    {joinedGroup.state === 'PENDING'
                      ? 'Cuando validemos el pago tendrás acceso a la cuenta 🥳'
                      : 'Ver credenciales 😎'}
                  </p>
                }
              >
                <div className="flex flex-col gap-2">
                  <Text color="primary">
                    Presiona en las credenciales para copiarlas
                  </Text>
                  <Card variant="flat" isPressable>
                    <Text
                      blockquote
                      onClick={() =>
                        handleCopyEmail(joinedGroup.group.credentialEmail)
                      }
                    >
                      {joinedGroup.group.credentialEmail}
                    </Text>
                  </Card>

                  <Card variant="flat" isPressable>
                    <Text
                      blockquote
                      onClick={() =>
                        handleCopyPassWord(joinedGroup.group.credentialPassword)
                      }
                    >
                      {joinedGroup.group.credentialPassword}
                    </Text>
                  </Card>
                </div>
              </Collapse>
            </Collapse.Group>
          </div>
        );
      })}
    </div>
  );
};

export default JoinedGroupsList;