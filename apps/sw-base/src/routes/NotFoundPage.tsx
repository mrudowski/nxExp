import {useTranslation} from 'react-i18next';

const NotFoundPage = () => {
  const {t} = useTranslation();

  return (
    <article>
      <h2>{t('errorPage.404')}</h2>
      <p>{t('errorPage.pageNotFound')}</p>
    </article>
  );
};

export default NotFoundPage;
