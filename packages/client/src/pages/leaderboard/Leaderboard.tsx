import PageFrame from '@components/PageFrame/PageFrame'
import LeaderCard from '@components/LeaderCard/LeaderCard'
import {
  leadersMock,
  usersScoreMock,
} from '@pages/leaderboard/leader-users-mock'
import classes from './styles.module.less'
import Avatar from '@components/Avatar/Avatar'
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary'

const LeaderboardPage = () => {
  return (
    <PageFrame pageType="leaderboard">
      <>
        <div className={classes.leadersCardWrapper}>
          {leadersMock.map(item => (
            <ErrorBoundary>
              <LeaderCard
                user={item}
                className={classes.leadersCardWrapper__card}
                key={`leader_card_${item.position}`}
              />
            </ErrorBoundary>
          ))}
        </div>
        <div className={classes.leaderboardTableWrapper}>
          {usersScoreMock.map((item, key) => (
            <div
              className={classes.leaderboardTableWrapper__item}
              key={`user_score_map_${key}`}>
              <Avatar size="xs" img={item.avatar} />
              <div className={classes.leaderboardTableWrapper__name}>
                {item.name}
              </div>
              <div className={classes.leaderboardTableWrapper__score}>
                {item.score.toLocaleString('ru-RU')}
              </div>
            </div>
          ))}
        </div>
      </>
    </PageFrame>
  )
}

export default LeaderboardPage
