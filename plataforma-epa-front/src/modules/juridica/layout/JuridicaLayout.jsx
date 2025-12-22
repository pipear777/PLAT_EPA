import { AppLayout } from '@/layouts';
import { JuridicaProvider } from '../context';

export const JuridicaLayout = () => {
  return (
    <JuridicaProvider>
      <AppLayout title={'Modulo Juridica'} />
    </JuridicaProvider>
  );
};
