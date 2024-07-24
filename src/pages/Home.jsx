import PlaylistCard from '../ui/PlaylistCard';

const sampleTrack = {
  image: 'https://i.scdn.co/image/ab67616d0000b27374558885d860bb58d78d1de8',
  trackName: 'Daily Mix 1',
  artists: ['The Walters', 'BØRNS', 'Mac DeMarco'],
};
function Home() {
  return (
    <div>
      <PlaylistCard
        image={sampleTrack.image}
        trackName={sampleTrack.trackName}
        artists={sampleTrack.artists}
      />
    </div>
  );
}

export default Home;
