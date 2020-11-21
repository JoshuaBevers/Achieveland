import React from 'react';
import { Progress } from 'antd';
import 'antd/dist/antd.css';

function AchievementProgressCircle(props) {
  const COMPLETEDACHIEVEMENTS = props.achievementsCompleted;
  const TOTALACHIEVEMENTS = props.achievementsToBeCompleted;

  const COMPLETEDPERCENT = (COMPLETEDACHIEVEMENTS / TOTALACHIEVEMENTS) * 100;

  return (
    <Progress strokeLinecap='square' type='circle' percent={COMPLETEDPERCENT} />
  );
}

export default AchievementProgressCircle;
