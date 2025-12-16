import { Line } from '@/components/ui/Line';
import { SETTING_TAB_TYPE } from '@/types';
import { FC, ReactNode, useState } from 'react';
import { Content, TabNav, TabsWrapper } from './styles';
import { TabButton } from './TabButton';

type Props = {
  tabs: Map<SETTING_TAB_TYPE, ReactNode>;
};

export const Tabs: FC<Props> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<SETTING_TAB_TYPE>(
    SETTING_TAB_TYPE.BASIC_AUTH
  );

  return (
    <TabsWrapper>
      <TabNav>
        {Array.from(tabs.entries()).map(([key]) => (
          <TabButton
            isActive={activeTab === key}
            title={key}
            key={key}
            onClick={() => setActiveTab(key)}
          />
        ))}
      </TabNav>
      <Line
        options={{
          direction: 'vertical',
        }}
      />
      <Content>{tabs.get(activeTab)}</Content>
    </TabsWrapper>
  );
};
