import { colors } from '@karrotmarket/design-token';
import { Icon } from '@shared/components';
import { isUndefined } from 'lodash';
import { Link, useParams } from 'react-router-dom';

import { DetailPathParam, pocketPath } from '../routes';
import Sandpack from './components/Sandpack';
import StoryNameList from './components/StoryNameList';
import useCode from './hooks/useCode';
import useCreateStory from './hooks/useCreateStory';
import useStory from './hooks/useStory';
import useStoryNames from './hooks/useStoryNames';
import * as style from './style.css';

const DetailPage: React.FC = () => {
  const { codeId } = useParams<keyof DetailPathParam>();
  const { data: codeDataRes } = useCode({ codeId });
  const { data: storyNamesRes } = useStoryNames({ codeId: codeId || '' });
  const { selectStory, selectedStory, selectedStoryId } = useStory();
  const { createStory } = useCreateStory({
    codeAuthor: codeDataRes?.codeAuthor,
    codeName: codeDataRes?.codeName,
    codeId: codeId || '',
    selectStory,
  });

  if (isUndefined(codeDataRes?.codeAuthor) || !codeDataRes?.codeName) return <></>;
  return (
    <div className={style.wrapper}>
      <div className={style.codeBlock}>
        <header className={style.header}>
          <div className={style.headerIcon}>
            <Link to={pocketPath}>
              <Icon icon="leftChevron" color={colors.light.scheme.$blue800} />
            </Link>
          </div>
          <h1 className={style.title}>
            {!codeDataRes?.isAnonymous && codeDataRes?.codeAuthor}
            <span className={style.highlight}> / </span>
            {codeDataRes?.codeName}
          </h1>
        </header>
        <article className={style.article}>
          <Sandpack
            code={codeDataRes?.code}
            codeName={codeDataRes?.codeName}
            codeAuthor={codeDataRes?.codeAuthor}
            selectedStory={selectedStory}
            pushCode={createStory}
          />
        </article>
        <StoryNameList
          pocketCodes={storyNamesRes?.storyNames || []}
          selectedStoryId={selectedStoryId}
          selectStory={selectStory}
        />
      </div>
    </div>
  );
};

export default DetailPage;
