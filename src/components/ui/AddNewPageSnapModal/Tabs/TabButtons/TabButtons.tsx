import { atom, useAtom } from 'jotai';
import { first } from 'lodash';
import { TabButton } from './TabButton/TabButton';
import ImportIcon from './assets/import-icon.svg';
import { Ul } from './styles';

export type TabType = {
  id: number;
  name: string;
  icon: string;
};

const tabs: TabType[] = [
  { id: 1, name: 'Import by Url', icon: ImportIcon },
  { id: 2, name: 'Import by csv', icon: ImportIcon },
  { id: 3, name: 'Import by sitemap', icon: ImportIcon },
];

export const tabIdName = { BY_TEXT: 1, BY_CSV: 2, BY_SITE_MAP: 3 };

export const defaultTab = first(tabs);

export const activeAddPageSnapTab = atom(defaultTab);

export const TabButtons = () => {
  const [activeTab, setActiveTab] = useAtom(activeAddPageSnapTab);

  return (
    <Ul>
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          tab={tab}
          onClick={() => setActiveTab(tab)}
          isActive={activeTab?.id === tab.id}
        />
      ))}
    </Ul>
  );
};
