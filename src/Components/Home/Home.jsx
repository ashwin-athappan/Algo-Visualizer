import Navbar from './Navbar';
import Cards from './Cards';
import { useHistory } from 'react-router-dom';

import './effects.css';
import home_img from './images/Home.png';

const Home = ({ loggedIn, setLoggedIn, user }) => {
	let history = useHistory();

    const scrollDown = () => {
        window.scrollTo({
            top: 1200,
            behavior: 'smooth',
        });
    }

	if (!loggedIn) {
		history.replace('/login');
	}

	return (
		<>
			<Navbar setLoggedIn={setLoggedIn} />
			<div className='home-container'>
				<div className='container_content'>
					<div className='container_content_inner'>
						<div className='title'>
							<h1 className='title-h1' style={{ fontFamily: 'Tourmaline' }}>
								<span style={{ color: '#25b79f' }}>Algo</span> Visualizer
							</h1>
						</div>
						<div className='par'>
							<p className='paragraph'>
								Hi There <span style={{ color: '#25b79f' }}>'{user}'</span>! You
								Can Use THis Platform To Visualize Various Algorithms Imitating.
								Visualizations Are Dynamic In A Way That Enables Any Novice
								Student To Understand The Algorithms Effectively. My Goal is to
								make the learning more simple and exciting.
							</p>
						</div>
						<div className='btns'>
							<button className='btns_more' onClick={scrollDown}> See more </button>
						</div>
					</div>
				</div>
				<div className='container_outer_img'>
					<div className='img-inner'>
						<img src={home_img} alt='' className='container_img' />
					</div>
				</div>
			</div>
			<div className='overlay'></div>
			<Cards />
		</>
	);
};

export default Home;
