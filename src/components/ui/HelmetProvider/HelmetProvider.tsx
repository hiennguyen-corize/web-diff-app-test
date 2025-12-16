import { kanaHaftToFull } from '@/utils/kanaHaftToFull';
import Head from 'next/head';
import { FC } from 'react';

type HelmetProviderType = {
  title: string;
  description?: string;
  thumbnail?: string;
  url?: string;
};

// const thumbNailDefault = Thumbnail.src;
const descriptionDefault = 'Aljaro store';

/** SEO support provider */
const HelmetProvider: FC<HelmetProviderType> = ({
  description = descriptionDefault.replace(/<br>/gi, ''),
  // thumbnail = thumbNailDefault,
  title,
}) => {
  return (
    <Head>
      {/* Main meta tags */}
      <title>{kanaHaftToFull(title)}</title>
      <meta name='title' content={kanaHaftToFull(title)} />
      <meta name='description' content={description} />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0'
      />
      {/* <meta name="theme-color" content={theme.colors.primary} />
			<meta name="theme-color" content={theme.colors.primary} /> */}
      {/* Open Graph / Facebook */}
      <meta property='og:type' content='website' />
      <meta property='og:title' content={kanaHaftToFull(title)} />
      <meta property='og:description' content={description} />
      {/* <meta property="og:image" content={convertWebpToOther(thumbnail)} /> */}

      {/* Twitter */}
      <meta name='twitter:card' content='summary'></meta>
      <meta property='twitter:title' content={kanaHaftToFull(title)} />
      <meta property='twitter:description' content={description} />
      {/* <meta property="twitter:image" content={thumbnail} /> */}
      {/* <link rel="icon" href={favicon.src} type="image/x-icon" />
			<link rel="apple-touch-icon" sizes="180x180" href={faviconApple.src} />
			<link rel="icon" type="image/png" sizes="32x32" href={faviconLarge.src} />
			<link
				rel="shortcut icon"
				type="image/png"
				sizes="16x16"
				href={faviconSmall.src}
			/> */}
    </Head>
  );
};

export default HelmetProvider;
