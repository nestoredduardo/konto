// Libraries
import { Card, Collapse, Loading, Text, User } from '@nextui-org/react';

// Hooks
import useUser from 'hooks/useUser';

// Helpers
import { formatDate } from 'lib/formatData';

// Types
import { AdminGroup } from 'request/prisma/userGroups/getAdminGroups';

interface IWalletScreen {
  response: any;
  error: any;
}

const WalletScreen: React.FC<IWalletScreen> = ({ response, error }) => {
  const { user } = useUser();

  return (
    <main className="mx-6 mb-28 lg:mx-12 xl:mx-56 flex flex-col md:flex-row gap-6 lg:gap-20 justify-center">
      <div className="md:w-96">
        <Card variant="bordered">
          <Card.Header>
            <div className="flex justify-between w-full items-center">
              <p className="text-gray-700 text-xl font-semibold">
                Saldo disponible
              </p>
              <img src="/logo.svg" className="h-10 w-10" />
            </div>
          </Card.Header>
          <Card.Body>
            <p className="text-center text-4xl text-primary font-smibold">
              S/ {user.walletAvailable}
            </p>
            <Collapse.Group>
              <Collapse
                title={
                  <p className="text-gray-500 font-semibold">Agregar Saldo</p>
                }
              ></Collapse>
            </Collapse.Group>
          </Card.Body>
        </Card>
      </div>

      <div className="lg:w-[400px]">
        <p className="text-gray-800 font-semibold text-xl mb-4">
          Próximos Pagos
        </p>
        {error === undefined && response === undefined && (
          <Loading className="mx-auto" />
        )}
        {response && response.data.length > 0 && (
          <div className="flex flex-col gap-5">
            {response.data.map((adminGroup: AdminGroup) => {
              return adminGroup.userGroups.map((userGroup) => {
                return (
                  <div className="flex justify-between">
                    <User
                      color="primary"
                      src={userGroup.user.image as string}
                      name={
                        <p className="text-primary-800 font-semibold">
                          {userGroup.user.name?.split(' ')[0] +
                            ' ' +
                            userGroup.user.name?.split(' ')[1] +
                            ' - ' +
                            adminGroup.plan.service.name}
                        </p>
                      }
                      description={
                        'Fecha de pago: ' + formatDate(userGroup.periodEnd)
                      }
                    />
                    <Text color="success" className="font-medium text-xl">
                      S/ {adminGroup.plan.adminGet} +
                    </Text>
                  </div>
                );
              });
            })}
          </div>
        )}
        {response && response.data.length === 0 && <p>No hay próximos pagos</p>}
      </div>
    </main>
  );
};

export default WalletScreen;