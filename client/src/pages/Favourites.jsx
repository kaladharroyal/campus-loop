import React from 'react';
import '../styles/pages.css';

const Favourites = () => {
    const [favorites, setFavorites] = React.useState([]);

    React.useEffect(() => {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            setFavorites(JSON.parse(saved));
        }
    }, []);

    const removeFavorite = (title) => {
        const newFavs = favorites.filter(c => c.title !== title);
        setFavorites(newFavs);
        localStorage.setItem('favorites', JSON.stringify(newFavs));
    };

    return (
        <div className="page-container">
            <div className="section-header">
                <h2>Your Favorite courses</h2>
                <p className="section-sub">Here you can see your favourite courses</p>
            </div>

            {favorites.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                    <p>No favorites added yet.</p>
                </div>
            ) : (
                <div className="course-grid-5">
                    {favorites.map((course, i) => (
                        <div key={i} className="campus-card registered">
                            <div className="card-image-placeholder small" style={course.color ? { background: course.color } : { background: '#1e293b' }}>
                                <img src={course.img} alt={course.title} width="100%" height="100%" style={{ objectFit: 'cover' }} />
                                <button
                                    className="fav-btn active"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFavorite(course.title);
                                    }}
                                >
                                    ❤️
                                </button>
                            </div>
                            <div className="card-content">
                                <h3>{course.title}</h3>
                                <p>{course.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favourites;
