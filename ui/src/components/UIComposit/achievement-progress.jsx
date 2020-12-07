import React from 'react';
import { Progress } from 'antd';
import 'antd/dist/antd.css';

function AchievementProgressCircle(props) {
  const COMPLETEDACHIEVEMENTS = props.achievementStatus;

  const TOTALACHIEVEMENTS = props.achievementTotal;

  const COMPLETEDPERCENT = (COMPLETEDACHIEVEMENTS / TOTALACHIEVEMENTS) * 100;
  return (
    <Progress strokeLinecap='square' type='circle' percent={COMPLETEDPERCENT} />
  );
}

export default AchievementProgressCircle;
