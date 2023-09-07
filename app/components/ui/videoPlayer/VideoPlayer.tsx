import { FC } from 'react'
import { useVideo } from './useVideo'
import { useAuth } from '@/hooks/useAuth'
import cn from 'classnames'
import MaterialIcon from '../MaterialIcon'
import { IVideoPlayer } from './video.types'
import AuthPlaceholder from './AuthPlaceholder/AuthPlaceholder'
import styles from './VideoPlayer.module.scss'

const VideoPlayer: FC<IVideoPlayer> = ({ slug, videoSource }) => {
	const { actions, video, videoRef } = useVideo()
	const { user } = useAuth()

	return (
		<section
			className={cn(styles.wrapper, {
				'h-96': !user,
			})}
		>
			{user ? (
				<>
					<video
						onClick={actions.toggleVideo}
						ref={videoRef}
						className={styles.video}
						src={`${videoSource}#t=8`}
						preload="metadata"
					/>

					<div className={styles.progressBarContainer}>
						<div
							style={{ width: `${video.progress}%` }}
							className={styles.progressBar}
						/>
					</div>
					<div className={styles.controls}>
						<div>
							<button onClick={actions.revert}>
								<MaterialIcon name="MdHistory" />
							</button>

							<button onClick={actions.toggleVideo}>
								<MaterialIcon
									name={
										video.isPlaying
											? 'MdPause'
											: 'MdPlayArrow'
									}
								/>
							</button>

							<button onClick={actions.fastForward}>
								<MaterialIcon name="MdUpdate" />
							</button>
							<div className={styles.timeControls}>
								<p className={styles.controlsTime}>
									{Math.floor(
										video.currentTime / 60
									) +
										':' +
										(
											'0' +
											Math.floor(
												video.currentTime %
													60
											)
										).slice(-2)}
								</p>
								<p> / </p>
								<p className={styles.controlsTime}>
									{Math.floor(video.videoTime / 60) +
										':' +
										(
											'0' +
											Math.floor(
												video.videoTime & 60
											)
										).slice(-2)}
								</p>
							</div>
						</div>
						<div>
							<button onClick={actions.fullScreen}>
								<MaterialIcon name="MdFullscreen" />
							</button>
						</div>
					</div>
				</>
			) : (
				<AuthPlaceholder slug={slug} />
			)}
		</section>
	)
}

export default VideoPlayer
