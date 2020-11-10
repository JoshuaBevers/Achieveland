import React from 'react';
import { Tooltip, Progress } from 'antd';
import 'antd/dist/antd.css';

function AchievementProgressCircle(props) {
  const COMPLETEDACHIEVEMENTS = props.achievementsCompleted;
  const TOTALACHIEVEMENTS = props.achievementsToBeCompleted;
  // const COMPLETEDACHIEVEMENTS = 4;
  // const TOTALACHIEVEMENTS = 4;

  //component math
  const COMPLETEDPERCENT = (COMPLETEDACHIEVEMENTS / TOTALACHIEVEMENTS) * 100;

  return (
    <Progress strokeLinecap='square' type='circle' percent={COMPLETEDPERCENT} />
    // <p>hello</p>
  );
}

export default AchievementProgressCircle;
