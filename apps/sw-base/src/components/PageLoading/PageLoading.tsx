import {useTranslation} from 'react-i18next';

const PageLoading = () => {
  const {t} = useTranslation();
  return <div>{t('utils.loading')}</div>;
};

export default PageLoading;
