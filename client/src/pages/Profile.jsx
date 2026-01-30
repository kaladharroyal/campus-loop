
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';
import { useAuth } from '../context/AuthContext';
import { useLayout } from '../context/LayoutContext';

const Profile = () => {
    const { user, login, updateProfile } = useAuth();
    const navigate = useNavigate();
    const { setIsSidebarHidden } = useLayout();
    const [isEditing, setIsEditing] = useState(false);
    const [activeSection, setActiveSection] = useState('About you');

    // State for form fields
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        branch: '',
        year: '',
        phone: '',
        email: '',
        profilePicture: '',
        name: '',
        bio: '',
        gender: '',
        dob: '',
        socialLinks: {
            github: '',
            linkedin: '',
            twitter: '',
            instagram: '',
            website: '',
            leetcode: ''
        },
        resume: '',
        skills: [],
        workExperience: [],
        hasNoWorkExperience: false,
        projects: [],
        hasNoProjects: false,
        isAvailableForMentoring: false,
        achievements: [],
        hasNoAchievements: false,
        competitions: [],
        hasNoCompetitions: false,
        events: [],
        hasNoEvents: false,
        certifications: [],
        hasNoCertifications: false,
        publications: [],
        hasNoPublications: false,
        languages: [],
        interests: [],
        roll: '',
        address: '',
        // Extended Contact Details
        secondaryEmail: '',
        alternatePhone: '',
        permanentAddress: '',
        currentAddress: '',
        currentAddressSame: false,
        parentDetails: {
            fatherName: '',
            fatherOccupation: '',
            motherName: '',
            motherOccupation: '',
            parentPhone: '',
            parentEmail: ''
        },
        currentEducation: {
            institution: '',
            currentSemester: '',
            department: '',
            rollNo: '',
            passoutBatch: '',
            specialization: '',
            semesterScores: [],
            marksheet: ''
        },
        previousEducation: {
            classXII: {
                schoolName: '',
                board: '',
                program: 'Class XII',
                startYear: '',
                endYear: '',
                educationType: '',
                percentage: '',
                cgpa: '',
                totalCgpa: '',
                notes: ''
            },
            classX: {
                schoolName: '',
                board: '',
                program: 'Class X',
                startYear: '',
                endYear: '',
                educationType: '',
                percentage: '',
                cgpa: '',
                totalCgpa: '',
                notes: ''
            }
        }
    });

    const [editingProfile, setEditingProfile] = useState(null);
    const [showAddProfile, setShowAddProfile] = useState(false);
    const [newSkill, setNewSkill] = useState({ name: '', level: '' });
    const [newWork, setNewWork] = useState({
        organization: '',
        role: '',
        employmentType: '',
        industry: '',
        location: '',
        skills: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        description: ''
    });
    const [newProject, setNewProject] = useState({
        name: '',
        domain: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        skills: '',
        description: '',
        link: '',
        completionLevel: 0
    });
    const [newAchievement, setNewAchievement] = useState({
        title: '',
        issuer: '',
        issueDate: '',
        description: ''
    });
    const [newCompetition, setNewCompetition] = useState({
        title: '',
        hostedBy: '',
        eventDate: '',
        mode: 'Online',
        outcome: '',
        description: ''
    });
    const [newEvent, setNewEvent] = useState({
        title: '',
        conductedOn: '',
        organizer: '',
        skillsAcquired: '',
        type: '',
        mode: 'Online',
        location: '',
        description: ''
    });
    const [newCertification, setNewCertification] = useState({
        title: '',
        issuer: '',
        issueDate: '',
        expiryDate: '',
        doesNotExpire: false,
        mode: 'Online',
        credentialUrl: '',
        description: ''
    });
    const [newPublication, setNewPublication] = useState({
        title: '',
        publisher: '',
        publishDate: '',
        link: '',
        description: ''
    });
    const [newLanguage, setNewLanguage] = useState({
        language: '',
        level: ''
    });
    const [customInterest, setCustomInterest] = useState('');

    const AVAILABLE_INTERESTS = [
        "3D Printing", "Aerospace", "Artificial Intelligence (AI)", "Automobile Engineering",
        "Backend Development", "CAD Design", "Computer Vision", "Content Writing", "Cyber Security",
        "Data Science", "Digital Marketing", "Embedded Systems", "Front End Development",
        "Full Stack Development", "Game Development", "Hardware (IoT)", "Image Processing",
        "Life Skills", "Machine Learning", "Mechatronics", "Mobile App Development", "Other",
        "Robotics", "Software Testing", "UI/UX", "Web Development"
    ];

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                branch: user.branch || '',
                year: user.year || '',
                phone: user.phone || '',
                email: user.email || '',
                profilePicture: user.profilePicture || '',
                roll: user.roll || '',
                address: user.address || '',
                name: user.name || '',
                bio: user.bio || '',
                gender: user.gender || '',
                dob: user.dob || '',
                secondaryEmail: user.secondaryEmail || '',
                alternatePhone: user.alternatePhone || '',
                permanentAddress: user.permanentAddress || '',
                currentAddress: user.currentAddress || '',
                currentAddressSame: user.currentAddress === user.permanentAddress && user.permanentAddress !== '',
                parentDetails: {
                    fatherName: user.parentDetails?.fatherName || '',
                    fatherOccupation: user.parentDetails?.fatherOccupation || '',
                    motherName: user.parentDetails?.motherName || '',
                    motherOccupation: user.parentDetails?.motherOccupation || '',
                    parentPhone: user.parentDetails?.parentPhone || '',
                    parentEmail: user.parentDetails?.parentEmail || ''
                },
                currentEducation: {
                    institution: user.currentEducation?.institution || '',
                    currentSemester: user.currentEducation?.currentSemester || '',
                    department: user.currentEducation?.department || '',
                    rollNo: user.currentEducation?.rollNo || '',
                    passoutBatch: user.currentEducation?.passoutBatch || '',
                    specialization: user.currentEducation?.specialization || '',
                    semesterScores: user.currentEducation?.semesterScores?.length > 0
                        ? user.currentEducation.semesterScores
                        : Array.from({ length: 8 }, (_, i) => ({ semester: i + 1, cgpa: '', sgpa: '', ongoingBacklogs: '-', totalBacklogs: '-', document: '' })),
                    marksheet: user.currentEducation?.marksheet || ''
                },
                previousEducation: {
                    classXII: { ...formData.previousEducation.classXII, ...user.previousEducation?.classXII },
                    classX: { ...formData.previousEducation.classX, ...user.previousEducation?.classX }
                },
                socialLinks: {
                    ...formData.socialLinks,
                    ...user.socialLinks,
                    leetcode: user.socialLinks?.leetcode || ''
                },
                resume: user.resume || '',
                skills: user.skills || [],
                workExperience: user.workExperience || [],
                hasNoWorkExperience: user.hasNoWorkExperience || false,
                projects: user.projects || [],
                hasNoProjects: user.hasNoProjects || false,
                isAvailableForMentoring: user.isAvailableForMentoring || false,
                achievements: user.achievements || [],
                hasNoAchievements: user.hasNoAchievements || false,
                competitions: user.competitions || [],
                hasNoCompetitions: user.hasNoCompetitions || false,
                events: user.events || [],
                hasNoEvents: user.hasNoEvents || false,
                certifications: user.certifications || [],
                hasNoCertifications: user.hasNoCertifications || false,
                publications: user.publications || [],
                hasNoPublications: user.hasNoPublications || false,
                languages: user.languages || [],
                interests: user.interests || []
            });
        }
    }, [user]);

    // Toggle global sidebar visibility based on edit mode
    useEffect(() => {
        setIsSidebarHidden(isEditing);
        return () => setIsSidebarHidden(false);
    }, [isEditing, setIsSidebarHidden]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSocialChange = (e) => {
        setFormData({
            ...formData,
            socialLinks: { ...formData.socialLinks, [e.target.name]: e.target.value }
        });
    };

    const handleAddSkill = () => {
        if (newSkill.name && newSkill.level) {
            setFormData({
                ...formData,
                skills: [...formData.skills, newSkill]
            });
            setNewSkill({ name: '', level: '' });
        } else {
            alert('Please enter skill name and select proficiency level');
        }
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = formData.skills.filter((_, i) => i !== index);
        setFormData({ ...formData, skills: updatedSkills });
    };

    const handleAddWork = () => {
        if (newWork.organization && newWork.role) {
            setFormData({
                ...formData,
                workExperience: [...formData.workExperience, newWork]
            });
            setNewWork({
                organization: '',
                role: '',
                employmentType: '',
                industry: '',
                location: '',
                skills: '',
                startDate: '',
                endDate: '',
                currentlyWorking: false,
                description: ''
            });
        } else {
            alert('Please fill in required fields (Organization, Role)');
        }
    };

    const handleRemoveWork = (index) => {
        const updatedWork = formData.workExperience.filter((_, i) => i !== index);
        setFormData({ ...formData, workExperience: updatedWork });
    };

    const handleAddProject = () => {
        if (newProject.name) {
            setFormData({
                ...formData,
                projects: [...formData.projects, newProject]
            });
            setNewProject({
                name: '',
                domain: '',
                startDate: '',
                endDate: '',
                currentlyWorking: false,
                skills: '',
                description: '',
                link: '',
                completionLevel: 0
            });
        } else {
            alert('Please enter project name');
        }
    };

    const handleRemoveProject = (index) => {
        const updatedProjects = formData.projects.filter((_, i) => i !== index);
        setFormData({ ...formData, projects: updatedProjects });
    };

    const handleAddAchievement = () => {
        if (newAchievement.title && newAchievement.issuer && newAchievement.issueDate) {
            setFormData({
                ...formData,
                achievements: [...formData.achievements, newAchievement]
            });
            setNewAchievement({
                title: '',
                issuer: '',
                issueDate: '',
                description: ''
            });
        } else {
            alert('Please fill in required fields (Title, Issuer, Date)');
        }
    };

    const handleRemoveAchievement = (index) => {
        const updatedAchievements = formData.achievements.filter((_, i) => i !== index);
        setFormData({ ...formData, achievements: updatedAchievements });
    };

    const handleAddCompetition = () => {
        if (newCompetition.title && newCompetition.hostedBy && newCompetition.eventDate) {
            setFormData({
                ...formData,
                competitions: [...formData.competitions, newCompetition]
            });
            setNewCompetition({
                title: '',
                hostedBy: '',
                eventDate: '',
                mode: 'Online',
                outcome: '',
                description: ''
            });
        } else {
            alert('Please fill in required fields (Title, Hosted By, Date)');
        }
    };

    const handleRemoveCompetition = (index) => {
        const updatedCompetitions = formData.competitions.filter((_, i) => i !== index);
        setFormData({ ...formData, competitions: updatedCompetitions });
    };

    const handleAddEvent = () => {
        if (newEvent.title && newEvent.conductedOn && newEvent.organizer && newEvent.type && newEvent.skillsAcquired) {
            setFormData({
                ...formData,
                events: [...formData.events, newEvent]
            });
            setNewEvent({
                title: '',
                conductedOn: '',
                organizer: '',
                skillsAcquired: '',
                type: '',
                mode: 'Online',
                location: '',
                description: ''
            });
        } else {
            alert('Please fill in required fields (Title, Date, Organizer, Skills, Type)');
        }
    };

    const handleRemoveEvent = (index) => {
        const updatedEvents = formData.events.filter((_, i) => i !== index);
        setFormData({ ...formData, events: updatedEvents });
    };

    const handleAddCertification = () => {
        if (newCertification.title && newCertification.issuer && newCertification.issueDate) {
            setFormData({
                ...formData,
                certifications: [...formData.certifications, newCertification]
            });
            setNewCertification({
                title: '',
                issuer: '',
                issueDate: '',
                expiryDate: '',
                doesNotExpire: false,
                mode: 'Online',
                credentialUrl: '',
                description: ''
            });
        } else {
            alert('Please fill in required fields (Title, Issuer, Issue Date)');
        }
    };

    const handleRemoveCertification = (index) => {
        const updatedCertifications = formData.certifications.filter((_, i) => i !== index);
        setFormData({ ...formData, certifications: updatedCertifications });
    };

    const handleAddPublication = () => {
        if (newPublication.title && newPublication.publisher && newPublication.publishDate) {
            setFormData({
                ...formData,
                publications: [...formData.publications, newPublication]
            });
            setNewPublication({
                title: '',
                publisher: '',
                publishDate: '',
                link: '',
                description: ''
            });
        } else {
            alert('Please fill in required fields (Title, Publisher, Date)');
        }
    };

    const handleRemovePublication = (index) => {
        const updatedPublications = formData.publications.filter((_, i) => i !== index);
        setFormData({ ...formData, publications: updatedPublications });
    };

    const handleAddLanguage = () => {
        if (newLanguage.language && newLanguage.level) {
            setFormData({
                ...formData,
                languages: [...formData.languages, newLanguage]
            });
            setNewLanguage({ language: '', level: '' });
        } else {
            alert('Please fill in required fields (Language, Level)');
        }
    };

    const handleRemoveLanguage = (index) => {
        const updatedLanguages = formData.languages.filter((_, i) => i !== index);
        setFormData({ ...formData, languages: updatedLanguages });
    };

    const toggleInterest = (interest) => {
        let updatedInterests;
        if (formData.interests.includes(interest)) {
            updatedInterests = formData.interests.filter(i => i !== interest);
        } else {
            updatedInterests = [...formData.interests, interest];
        }
        setFormData({ ...formData, interests: updatedInterests });
    };

    const handleAddCustomInterest = () => {
        if (customInterest && !formData.interests.includes(customInterest)) {
            setFormData({
                ...formData,
                interests: [...formData.interests, customInterest]
            });
            setCustomInterest('');
        }
    };

    const handleParentChange = (e) => {
        setFormData({
            ...formData,
            parentDetails: {
                ...formData.parentDetails,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleEducationChange = (e, field) => {
        setFormData({
            ...formData,
            currentEducation: {
                ...formData.currentEducation,
                [field]: e.target.value
            }
        });
    };

    const handlePreviousEducationChange = (level, field, value) => {
        setFormData({
            ...formData,
            previousEducation: {
                ...formData.previousEducation,
                [level]: {
                    ...formData.previousEducation[level],
                    [field]: value
                }
            }
        });
    };

    const handleScoreChange = (index, field, value) => {
        const newScores = [...formData.currentEducation.semesterScores];
        newScores[index] = { ...newScores[index], [field]: value };
        setFormData({
            ...formData,
            currentEducation: {
                ...formData.currentEducation,
                semesterScores: newScores
            }
        });
    };

    const handleSameAddressChange = (e) => {
        const isChecked = e.target.checked;
        setFormData(prev => ({
            ...prev,
            currentAddressSame: isChecked,
            currentAddress: isChecked ? prev.permanentAddress : prev.currentAddress
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, profilePicture: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            await updateProfile({
                firstName: formData.firstName,
                lastName: formData.lastName,
                branch: formData.branch,
                year: formData.year,
                phone: formData.phone,
                email: formData.email,
                profilePicture: formData.profilePicture,
                name: formData.name,
                bio: formData.bio,
                bio: formData.bio,
                socialLinks: formData.socialLinks,
                // Extended Fields
                secondaryEmail: formData.secondaryEmail,
                alternatePhone: formData.alternatePhone,
                permanentAddress: formData.permanentAddress,
                currentAddress: formData.currentAddress,
                parentDetails: formData.parentDetails,
                currentEducation: formData.currentEducation,
                previousEducation: formData.previousEducation,
                skills: formData.skills,
                resume: formData.resume,
                workExperience: formData.workExperience,
                hasNoWorkExperience: formData.hasNoWorkExperience,
                projects: formData.projects,
                hasNoProjects: formData.hasNoProjects,
                isAvailableForMentoring: formData.isAvailableForMentoring,
                achievements: formData.achievements,
                hasNoAchievements: formData.hasNoAchievements,
                competitions: formData.competitions,
                hasNoCompetitions: formData.hasNoCompetitions,
                events: formData.events,
                hasNoEvents: formData.hasNoEvents,
                certifications: formData.certifications,
                hasNoCertifications: formData.hasNoCertifications,
                publications: formData.publications,
                hasNoPublications: formData.hasNoPublications,
                languages: formData.languages,
                interests: formData.interests
            });
            setIsEditing(false);
            setIsSidebarHidden(false);
            alert('Profile updated successfully!');
        } catch (error) {
            alert(error.message);
        }
    };

    // Navigation Items
    const navItems = [
        {
            section: 'Profile', items: [
                { id: 'About you', icon: '👤', label: 'About you' },
                { id: 'Contact Details', icon: '✉️', label: 'Contact Details' },
                { id: 'Current Education', icon: '🎓', label: 'Current Education' },
                { id: 'Other Education', icon: '📱', label: 'Other Education' },
                { id: 'External Profiles', icon: '🔗', label: 'External Profiles' },
                { id: 'Resume', icon: '📄', label: 'Resume' },
                { id: 'Skills', icon: '</>', label: 'Skills' },
                { id: 'Work', icon: '💼', label: 'Work' },
                { id: 'Projects', icon: '📂', label: 'Projects' },
                { id: 'Mentoring', icon: '👨‍🏫', label: 'Mentoring' },
                { id: 'Additional Questions', icon: '❓', label: 'Additional Questions' },
            ]
        },
        {
            section: 'Achievements', items: [
                { id: 'Achievements', icon: '🏆', label: 'Achievements' },
                { id: 'Competitions', icon: '👥', label: 'Competitions' },
                { id: 'Events', icon: '📅', label: 'Events' },
                { id: 'Certifications', icon: '🎖️', label: 'Certifications' },
                { id: 'Publications', icon: '📖', label: 'Publications' },
                { id: 'Patents', icon: '📜', label: 'Patents' },
            ]
        },
        {
            section: 'Preferences', items: [
                { id: 'Languages', icon: '🈚', label: 'Languages' },
                { id: 'Interests', icon: '♡', label: 'Interests' },
                { id: 'Password Reset', icon: '🔑', label: 'Password Reset' },
            ]
        }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'About you':
                return (
                    <div className="form-section">
                        {/* Profile Picture Card */}
                        <div className="card-ui profile-picture-card">
                            <div className="card-header-ui">
                                <h3>Profile Picture</h3>
                            </div>
                            <div className="card-body-ui" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                                <div className="profile-pic-large" style={{
                                    width: '100px', height: '100px', borderRadius: '50%',
                                    overflow: 'hidden', backgroundImage: formData.profilePicture ? `url(${formData.profilePicture})` : 'none',
                                    backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#f3f4f6', flexShrink: 0,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', color: '#9ca3af'
                                }}>
                                    {!formData.profilePicture && (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                            <polyline points="17 8 12 3 7 8"></polyline>
                                            <line x1="12" y1="3" x2="12" y2="15"></line>
                                        </svg>
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ marginBottom: '15px', color: '#6b7280', fontSize: '0.95rem' }}>
                                        Click or drag and drop to upload your profile picture
                                    </p>
                                    <input
                                        type="file"
                                        id="profile-upload"
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />
                                    <label htmlFor="profile-upload" className="btn-upload">
                                        Upload Photo
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Personal Details Card */}
                        <div className="card-ui personal-details-card">
                            <div className="card-header-ui">
                                <span className="icon-wrapper user-icon">👤</span>
                                <h3>Personal Details</h3>
                            </div>
                            <div className="card-body-ui">
                                <div className="input-group-stack">
                                    <label>Full Name<span className="required">*</span></label>
                                    <input
                                        type="text"
                                        className="input-outline"
                                        value={`${formData.firstName} ${formData.lastName} `.trim()}
                                        readOnly
                                        style={{ background: '#f9fafb' }}
                                    />
                                </div>
                                <div className="input-group-stack">
                                    <label>Gender<span className="required">*</span></label>
                                    <select
                                        name="gender"
                                        className="input-outline"
                                        value={formData.gender || ''}
                                        onChange={handleChange}
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Birthday Card */}
                        <div className="card-ui birthday-card">
                            <div className="card-header-ui">
                                <span className="icon-wrapper calendar-icon">📅</span>
                                <h3>Birthday</h3>
                            </div>
                            <div className="card-body-ui">
                                <div className="input-group-stack">
                                    <label>Date of Birth</label>
                                    <input
                                        type="date"
                                        name="dob"
                                        className="input-outline"
                                        value={formData.dob ? formData.dob.split('T')[0] : ''}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* About You Card */}
                        <div className="card-ui bio-card">
                            <div className="card-header-ui">
                                <span className="icon-wrapper info-icon">ℹ️</span>
                                <h3>About You</h3>
                            </div>
                            <div className="card-body-ui">
                                <div className="input-group-stack">
                                    <label>Short Bio<span className="required">*</span></label>
                                    <textarea
                                        name="bio"
                                        className="input-outline"
                                        style={{ width: '100%', minHeight: '100px', resize: 'vertical' }}
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Showcase your uniqueness in a short bio"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Work':
                return (
                    <div className="form-section">
                        {/* No Experience Checkbox */}
                        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="noExperience"
                                checked={formData.hasNoWorkExperience}
                                onChange={(e) => setFormData({ ...formData, hasNoWorkExperience: e.target.checked })}
                                style={{ width: '16px', height: '16px', marginRight: '10px' }}
                            />
                            <label htmlFor="noExperience" style={{ color: '#64748b', cursor: 'pointer' }}>I'm yet to find my first Opportunity</label>
                        </div>

                        {/* Existing Work List */}
                        {formData.workExperience && formData.workExperience.map((work, index) => (
                            <div key={index} className="card-ui" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px', color: '#1e293b' }}>{work.role}</h4>
                                        <p style={{ margin: '0 0 5px', color: '#4f46e5', fontWeight: '500' }}>{work.organization}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                                            {new Date(work.startDate).toLocaleDateString()} - {work.currentlyWorking ? 'Present' : new Date(work.endDate).toLocaleDateString()} • {work.location}
                                        </p>
                                    </div>
                                    <button onClick={() => handleRemoveWork(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                                </div>
                            </div>
                        ))}

                        {/* Add Work Form - Hide if "No Experience" is checked? Screenshot doesn't confirm, but unlikely to add work if checking "no work". But let's keep it visible or disable it. Assuming standard behavior.*/}
                        {!formData.hasNoWorkExperience && (
                            <div className="card-ui" style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <h4 style={{ margin: '0 0 20px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: '#8b5cf6', background: '#f3e8ff', padding: '4px', borderRadius: '6px' }}>💼</span> Add Work Experience
                                </h4>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="input-group">
                                        <label>Organization <span className="required">*</span></label>
                                        <input type="text" className="input-outline" value={newWork.organization} onChange={(e) => setNewWork({ ...newWork, organization: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Role <span className="required">*</span></label>
                                        <input type="text" className="input-outline" value={newWork.role} onChange={(e) => setNewWork({ ...newWork, role: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Type of Employment <span className="required">*</span></label>
                                        <select className="input-outline" value={newWork.employmentType} onChange={(e) => setNewWork({ ...newWork, employmentType: e.target.value })}>
                                            <option value="">Select type</option>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Freelance">Freelance</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label>Industry <span className="required">*</span></label>
                                        <select className="input-outline" value={newWork.industry} onChange={(e) => setNewWork({ ...newWork, industry: e.target.value })}>
                                            <option value="">Select industry</option>
                                            <option value="IT">IT</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Education">Education</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Location</label>
                                        <input type="text" className="input-outline" value={newWork.location} onChange={(e) => setNewWork({ ...newWork, location: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>What skills you have learnt/worked at this work/Internship? <span className="required">*</span></label>
                                        <input type="text" className="input-outline" placeholder="Search or Add.." value={newWork.skills} onChange={(e) => setNewWork({ ...newWork, skills: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Start date <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newWork.startDate} onChange={(e) => setNewWork({ ...newWork, startDate: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>End date <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newWork.endDate} onChange={(e) => setNewWork({ ...newWork, endDate: e.target.value })} disabled={newWork.currentlyWorking} />
                                    </div>
                                    <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="checkbox"
                                            id="currentWork"
                                            checked={newWork.currentlyWorking}
                                            onChange={(e) => setNewWork({ ...newWork, currentlyWorking: e.target.checked })}
                                            style={{ width: '16px', height: '16px', marginRight: '10px' }}
                                        />
                                        <label htmlFor="currentWork">I'm currently working here</label>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Description</label>
                                        <textarea className="input-outline" style={{ minHeight: '100px' }} value={newWork.description} onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}></textarea>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn-primary" onClick={handleAddWork} style={{ background: '#4f46e5' }}>Add Work</button>
                                </div>
                            </div>
                        )}

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Projects':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px', textAlign: 'center' }}>
                            {formData.projects.length === 0 && !formData.hasNoProjects && (
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '2.5rem', color: '#cbd5e1', marginBottom: '10px' }}>📂</div>
                                    <p style={{ color: '#64748b' }}>No projects added yet</p>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Add your projects to showcase your practical experience and technical skills</p>
                                </div>
                            )}
                        </div>

                        {/* No Projects Checkbox */}
                        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="noProjects"
                                checked={formData.hasNoProjects}
                                onChange={(e) => setFormData({ ...formData, hasNoProjects: e.target.checked })}
                                style={{ width: '16px', height: '16px', marginRight: '10px' }}
                            />
                            <label htmlFor="noProjects" style={{ color: '#64748b', cursor: 'pointer' }}>I've not done any projects</label>
                        </div>

                        {/* Projects List */}
                        {formData.projects && formData.projects.map((proj, index) => (
                            <div key={index} className="card-ui" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px', color: '#1e293b', fontSize: '1.1rem' }}>{proj.name}</h4>
                                        <p style={{ margin: '0 0 5px', color: '#4f46e5', fontWeight: '500' }}>{proj.domain}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                                            {proj.startDate ? new Date(proj.startDate).toLocaleDateString() : ''} - {proj.currentlyWorking ? 'Present' : (proj.endDate ? new Date(proj.endDate).toLocaleDateString() : '')}
                                        </p>
                                        <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '5px' }}>Skills: {proj.skills}</p>
                                    </div>
                                    <button onClick={() => handleRemoveProject(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                                </div>
                            </div>
                        ))}

                        {/* Add Project Form */}
                        {!formData.hasNoProjects && (
                            <div className="card-ui" style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <h4 style={{ margin: '0 0 20px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: '#6366f1', background: '#e0e7ff', padding: '4px', borderRadius: '6px' }}>📂</span> Add New Project
                                </h4>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Project name <span className="required">*</span></label>
                                        <input type="text" className="input-outline" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Project domain <span className="required">*</span></label>
                                        <input type="text" className="input-outline" placeholder="Search or Add.." value={newProject.domain} onChange={(e) => setNewProject({ ...newProject, domain: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Start date <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newProject.startDate} onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>End date <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newProject.endDate} onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })} disabled={newProject.currentlyWorking} />
                                    </div>
                                    <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="checkbox"
                                            id="currentProject"
                                            checked={newProject.currentlyWorking}
                                            onChange={(e) => setNewProject({ ...newProject, currentlyWorking: e.target.checked })}
                                            style={{ width: '16px', height: '16px', marginRight: '10px' }}
                                        />
                                        <label htmlFor="currentProject">I'm currently working on this project</label>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Select skills used in the project <span className="required">*</span></label>
                                        <input type="text" className="input-outline" placeholder="Search or Add.." value={newProject.skills} onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Description <span className="required">*</span></label>
                                        <textarea className="input-outline" style={{ minHeight: '100px' }} value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}></textarea>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Project Link</label>
                                        <input type="text" className="input-outline" value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Level of Completion</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>0%</span>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={newProject.completionLevel}
                                                onChange={(e) => setNewProject({ ...newProject, completionLevel: parseInt(e.target.value) })}
                                                style={{ flex: 1 }}
                                            />
                                            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>100%</span>
                                        </div>
                                        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#4f46e5', marginTop: '5px' }}>{newProject.completionLevel}%</div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn-primary" onClick={handleAddProject} style={{ background: '#4f46e5' }}>Add Project</button>
                                </div>
                            </div>
                        )}

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Mentoring':
            case 'Contact Details':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#1e293b' }}>CONTACT DETAILS</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Manage your contact information</p>
                        </div>

                        <div className="profile-form">
                            {/* Email Information - Full Width Section */}
                            <div style={{ gridColumn: '1 / -1' }}>
                                <h4 style={{ margin: '0 0 15px', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Email Information</h4>
                                <div className="input-group" style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span style={{ fontSize: '1.2rem' }}>✉️</span> Primary Email Address
                                    </label>
                                    <input type="email" name="email" className="input-outline" value={formData.email} onChange={handleChange} disabled style={{ background: '#f1f5f9', width: '100%' }} />
                                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '5px' }}>This is your primary email and cannot be changed here</p>
                                </div>
                                <div className="input-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span style={{ fontSize: '1.2rem' }}>✉️</span> Secondary Email Address <span className="required">*</span>
                                    </label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input
                                            type="email"
                                            name="secondaryEmail"
                                            className="input-outline"
                                            value={formData.secondaryEmail}
                                            onChange={handleChange}
                                            placeholder="Enter your secondary email"
                                            style={{ flex: 1 }}
                                        />
                                        <button className="btn-primary" style={{ padding: '0 20px', fontSize: '0.9rem' }}>Verify</button>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Information - Full Width Section */}
                            <div style={{ gridColumn: '1 / -1' }}>
                                <h4 style={{ margin: '15px 0 15px', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Phone Information</h4>
                                <div className="input-group" style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span style={{ fontSize: '1.2rem' }}>📞</span> Mobile Number <span className="required">*</span>
                                    </label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <span className="input-outline" style={{ width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>+91</span>
                                        <input type="text" name="phone" className="input-outline" value={formData.phone} onChange={handleChange} style={{ flex: 1 }} />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span style={{ fontSize: '1.2rem' }}>📞</span> Alternate Mobile Number <span className="required">*</span>
                                    </label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <span className="input-outline" style={{ width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>+91</span>
                                        <input type="text" name="alternatePhone" className="input-outline" value={formData.alternatePhone} onChange={handleChange} placeholder="Enter 10 digit mobile number" style={{ flex: 1 }} />
                                    </div>
                                </div>
                            </div>

                            {/* Address Information - Full Width Section */}
                            <div style={{ gridColumn: '1 / -1' }}>
                                <h4 style={{ margin: '15px 0 15px', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Address Information</h4>
                                <div className="input-group" style={{ marginBottom: '15px' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span style={{ fontSize: '1.2rem' }}>📍</span> Permanent Address <span className="required">*</span>
                                    </label>
                                    <textarea
                                        name="permanentAddress"
                                        className="input-outline"
                                        value={formData.permanentAddress}
                                        onChange={(e) => {
                                            handleChange(e);
                                            if (formData.currentAddressSame) {
                                                setFormData(prev => ({ ...prev, currentAddress: e.target.value }));
                                            }
                                        }}
                                        placeholder="Enter your permanent address"
                                        style={{ minHeight: '80px', resize: 'vertical', width: '100%' }}
                                    />
                                </div>

                                <div className="input-group">
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <span style={{ fontSize: '1.2rem' }}>📍</span> Current Address <span className="required">*</span>
                                    </label>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                                        <input
                                            type="checkbox"
                                            id="sameAddress"
                                            checked={formData.currentAddressSame}
                                            onChange={handleSameAddressChange}
                                            style={{ width: '16px', height: '16px' }}
                                        />
                                        <label htmlFor="sameAddress" style={{ margin: 0, fontWeight: 'normal', color: '#64748b', cursor: 'pointer' }}>Same as permanent address</label>
                                    </div>
                                    <textarea
                                        name="currentAddress"
                                        className="input-outline"
                                        value={formData.currentAddress}
                                        onChange={handleChange}
                                        placeholder="Enter your current address"
                                        style={{ minHeight: '80px', resize: 'vertical', width: '100%' }}
                                        disabled={formData.currentAddressSame}
                                    />
                                </div>
                            </div>

                            {/* Parent/Guardian Information - Full Width Section with inner grid */}
                            <div style={{ gridColumn: '1 / -1' }}>
                                <h4 style={{ margin: '15px 0 15px', color: '#334155', borderBottom: '1px solid #e2e8f0', paddingBottom: '10px' }}>Parent/Guardian Information</h4>
                                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '20px' }}>
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span style={{ fontSize: '1.1rem' }}>👤</span> Father's Name <span className="required">*</span>
                                        </label>
                                        <input type="text" name="fatherName" className="input-outline" value={formData.parentDetails.fatherName} onChange={handleParentChange} placeholder="Enter father's name" style={{ width: '100%' }} />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span style={{ fontSize: '1.1rem' }}>👤</span> Father's Occupation <span className="required">*</span>
                                        </label>
                                        <input type="text" name="fatherOccupation" className="input-outline" value={formData.parentDetails.fatherOccupation} onChange={handleParentChange} placeholder="Enter father's occupation" style={{ width: '100%' }} />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span style={{ fontSize: '1.1rem' }}>👤</span> Mother's Name <span className="required">*</span>
                                        </label>
                                        <input type="text" name="motherName" className="input-outline" value={formData.parentDetails.motherName} onChange={handleParentChange} placeholder="Enter mother's name" style={{ width: '100%' }} />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span style={{ fontSize: '1.1rem' }}>👤</span> Mother's Occupation <span className="required">*</span>
                                        </label>
                                        <input type="text" name="motherOccupation" className="input-outline" value={formData.parentDetails.motherOccupation} onChange={handleParentChange} placeholder="Enter mother's occupation" style={{ width: '100%' }} />
                                    </div>
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span style={{ fontSize: '1.1rem' }}>📞</span> Parent Mobile Number <span className="required">*</span>
                                        </label>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <span className="input-outline" style={{ width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>+91</span>
                                            <input type="text" name="parentPhone" className="input-outline" value={formData.parentDetails.parentPhone} onChange={handleParentChange} placeholder="Enter 10 digit mobile number" style={{ flex: 1 }} />
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                            <span style={{ fontSize: '1.1rem' }}>✉️</span> Parent Email ID <span className="required">*</span>
                                        </label>
                                        <input type="email" name="parentEmail" className="input-outline" value={formData.parentDetails.parentEmail} onChange={handleParentChange} placeholder="Enter parent's email" style={{ width: '100%' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Current Education':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', color: '#1e293b' }}>ACADEMIC DETAILS</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Current education info</p>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}><span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 'normal' }}>CGPA</span></div>
                                <div style={{ fontSize: '1.1rem', color: '#3b82f6', fontWeight: '600' }}><span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 'normal' }}>Percentage</span></div>
                            </div>
                        </div>

                        <div className="profile-form">
                            {/* Academic Header Grid */}
                            <div style={{ gridColumn: '1 / -1', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
                                <div className="input-group">
                                    <label>Institution :</label>
                                    <input type="text" className="input-outline" value={formData.currentEducation.institution} onChange={(e) => handleEducationChange(e, 'institution')} placeholder="college name" />
                                </div>
                                <div className="input-group">
                                    <label>Current Semester :</label>
                                    <input type="text" className="input-outline" value={formData.currentEducation.currentSemester} onChange={(e) => handleEducationChange(e, 'currentSemester')} placeholder="current semester" />
                                </div>
                                <div className="input-group">
                                    <label>Department :</label>
                                    <input type="text" className="input-outline" value={formData.currentEducation.department} onChange={(e) => handleEducationChange(e, 'department')} placeholder="department name" />
                                </div>
                                <div className="input-group">
                                    <label>Institutional Roll No. :</label>
                                    <input type="text" className="input-outline" value={formData.currentEducation.rollNo} onChange={(e) => handleEducationChange(e, 'rollNo')} placeholder="roll number" />
                                </div>
                                <div className="input-group">
                                    <label>Passout Batch :</label>
                                    <input type="text" className="input-outline" value={formData.currentEducation.passoutBatch} onChange={(e) => handleEducationChange(e, 'passoutBatch')} placeholder="passout batch" />
                                </div>
                                <div className="input-group">
                                    <label>Branch/Specialization :</label>
                                    <input type="text" className="input-outline" value={formData.currentEducation.specialization} onChange={(e) => handleEducationChange(e, 'specialization')} placeholder="specialization" />
                                </div>
                            </div>

                            {/* Semester Wise Scores Table */}
                            <div style={{ gridColumn: '1 / -1', marginBottom: '30px' }}>
                                <h4 style={{ margin: '0 0 15px', color: '#334155' }}>Semester wise Scores</h4>
                                <div className="scores-table-container" style={{ overflowX: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                                        <thead>
                                            <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                                <th style={{ padding: '12px', textAlign: 'left', fontSize: '0.9rem', color: '#64748b' }}>Semester</th>
                                                {formData.currentEducation.semesterScores.map((score, index) => (
                                                    <th key={index} style={{ padding: '12px', textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>{score.semester}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* CGPA Row */}
                                            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '12px', fontWeight: '500', color: '#334155' }}>Cgpa</td>
                                                {formData.currentEducation.semesterScores.map((score, index) => (
                                                    <td key={index} style={{ padding: '8px', textAlign: 'center' }}>
                                                        <input
                                                            type="text"
                                                            value={score.cgpa}
                                                            onChange={(e) => handleScoreChange(index, 'cgpa', e.target.value)}
                                                            className="input-outline"
                                                            style={{ width: '50px', padding: '4px', textAlign: 'center', fontSize: '0.9rem' }}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                            {/* SGPA Row */}
                                            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '12px', fontWeight: '500', color: '#334155' }}>Sgpa</td>
                                                {formData.currentEducation.semesterScores.map((score, index) => (
                                                    <td key={index} style={{ padding: '8px', textAlign: 'center' }}>
                                                        <input
                                                            type="text"
                                                            value={score.sgpa}
                                                            onChange={(e) => handleScoreChange(index, 'sgpa', e.target.value)}
                                                            className="input-outline"
                                                            style={{ width: '50px', padding: '4px', textAlign: 'center', fontSize: '0.9rem' }}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                            {/* Ongoing Backlogs Row */}
                                            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '12px', fontWeight: '500', color: '#334155' }}>Ongoing Backlogs</td>
                                                {formData.currentEducation.semesterScores.map((score, index) => (
                                                    <td key={index} style={{ padding: '8px', textAlign: 'center' }}>
                                                        <input
                                                            type="text"
                                                            value={score.ongoingBacklogs}
                                                            onChange={(e) => handleScoreChange(index, 'ongoingBacklogs', e.target.value)}
                                                            className="input-outline"
                                                            style={{ width: '50px', padding: '4px', textAlign: 'center', fontSize: '0.9rem' }}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                            {/* Total Backlogs Row */}
                                            <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                                                <td style={{ padding: '12px', fontWeight: '500', color: '#334155' }}>Total Backlogs</td>
                                                {formData.currentEducation.semesterScores.map((score, index) => (
                                                    <td key={index} style={{ padding: '8px', textAlign: 'center' }}>
                                                        <input
                                                            type="text"
                                                            value={score.totalBacklogs}
                                                            onChange={(e) => handleScoreChange(index, 'totalBacklogs', e.target.value)}
                                                            className="input-outline"
                                                            style={{ width: '50px', padding: '4px', textAlign: 'center', fontSize: '0.9rem' }}
                                                        />
                                                    </td>
                                                ))}
                                            </tr>
                                            {/* Attached Documents Row */}
                                            <tr>
                                                <td style={{ padding: '12px', fontWeight: '500', color: '#334155' }}>Attached Documents</td>
                                                {formData.currentEducation.semesterScores.map((score, index) => (
                                                    <td key={index} style={{ padding: '8px', textAlign: 'center' }}>
                                                        <button
                                                            className="btn-secondary"
                                                            style={{ padding: '4px 8px', fontSize: '0.7rem', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '2px' }}
                                                            onClick={() => alert('File upload feature coming soon')}
                                                        >
                                                            <span>⬆️</span>
                                                            Upload
                                                        </button>
                                                    </td>
                                                ))}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* Marksheet Upload Section */}
                            <div style={{ gridColumn: '1 / -1' }}>
                                <h4 style={{ margin: '0 0 15px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: '#ef4444' }}>📄</span> Marksheet
                                </h4>
                                <div
                                    className="upload-area"
                                    style={{
                                        border: '2px dashed #cbd5e1',
                                        borderRadius: '12px',
                                        padding: '40px',
                                        textAlign: 'center',
                                        background: '#f8fafc',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    <div style={{ fontSize: '2rem', marginBottom: '10px', color: '#94a3b8' }}>⬆️</div>
                                    <h5 style={{ margin: '0 0 5px', color: '#334155' }}>Drag and drop your marksheet here</h5>
                                    <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>or click to browse (PDF, max 5MB)</p>
                                    <input type="file" style={{ display: 'none' }} onChange={(e) => alert('Marksheet upload coming soon')} />
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'Other Education':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#1e293b' }}>Previous Educations</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>List all your educational qualifications and academic achievements.</p>
                        </div>

                        {/* Class XII Card */}
                        <div className="card-ui" style={{ marginBottom: '30px', padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h4 style={{ margin: 0, color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: '#f97316' }}>🔓</span> CLASS XII/Intermediate/Diploma
                                </h4>
                                <span style={{ background: '#fff7ed', color: '#f97316', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', border: '1px solid #ffedd5' }}>Pre-selected</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                    <label>School/Institution Name <span className="required">*</span></label>
                                    <input type="text" className="input-outline" placeholder="Search or add school.." value={formData.previousEducation.classXII.schoolName} onChange={(e) => handlePreviousEducationChange('classXII', 'schoolName', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Select Board/University <span className="required">*</span></label>
                                    <input type="text" className="input-outline" placeholder="Search or add board..." value={formData.previousEducation.classXII.board} onChange={(e) => handlePreviousEducationChange('classXII', 'board', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Select Program/Degree/Certificate <span className="required">*</span></label>
                                    <input type="text" className="input-outline" value="Class XII" disabled style={{ background: '#f8fafc' }} />
                                </div>
                                <div className="input-group">
                                    <label>Select Education Type <span className="required">*</span></label>
                                    <select className="input-outline" value={formData.previousEducation.classXII.educationType} onChange={(e) => handlePreviousEducationChange('classXII', 'educationType', e.target.value)}>
                                        <option value="">Select Type</option>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        <option value="Distance">Distance</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Select Start Year & End Year <span className="required">*</span></label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input type="number" className="input-outline" placeholder="Start Year" style={{ flex: 1 }} value={formData.previousEducation.classXII.startYear} onChange={(e) => handlePreviousEducationChange('classXII', 'startYear', e.target.value)} />
                                        <input type="number" className="input-outline" placeholder="End Year" style={{ flex: 1 }} value={formData.previousEducation.classXII.endYear} onChange={(e) => handlePreviousEducationChange('classXII', 'endYear', e.target.value)} />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>Score in Percentage <span className="required">*</span></label>
                                    <input type="text" className="input-outline" placeholder="Enter percentage" value={formData.previousEducation.classXII.percentage} onChange={(e) => handlePreviousEducationChange('classXII', 'percentage', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Your CGPA</label>
                                    <div style={{ display: 'flex' }}>
                                        <input type="text" className="input-outline" placeholder="Your CGPA" style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }} value={formData.previousEducation.classXII.cgpa} onChange={(e) => handlePreviousEducationChange('classXII', 'cgpa', e.target.value)} />
                                        <span style={{ padding: '0 12px', background: '#f8fafc', border: '1px solid #777', borderLeft: 'none', borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center', color: '#64748b' }}>CGPA</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>Total CGPA</label>
                                    <div style={{ display: 'flex' }}>
                                        <input type="text" className="input-outline" placeholder="Total CGPA" style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }} value={formData.previousEducation.classXII.totalCgpa} onChange={(e) => handlePreviousEducationChange('classXII', 'totalCgpa', e.target.value)} />
                                        <span style={{ padding: '0 12px', background: '#f8fafc', border: '1px solid #777', borderLeft: 'none', borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center', color: '#64748b' }}>CGPA</span>
                                    </div>
                                </div>
                                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                    <label>Notes/Highlights</label>
                                    <textarea className="input-outline" placeholder="You can mention your class/department/university ranks or other highlights, if any" style={{ minHeight: '80px', width: '100%' }} value={formData.previousEducation.classXII.notes} onChange={(e) => handlePreviousEducationChange('classXII', 'notes', e.target.value)} />
                                </div>
                            </div>
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="btn-primary" onClick={handleSave} style={{ background: '#4f46e5' }}>Save CLASS XII/Intermediate/Diploma</button>
                            </div>
                        </div>

                        {/* Class X Card */}
                        <div className="card-ui" style={{ marginBottom: '30px', padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                <h4 style={{ margin: 0, color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: '#f97316' }}>🔓</span> CLASS X
                                </h4>
                                <span style={{ background: '#fff7ed', color: '#f97316', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', border: '1px solid #ffedd5' }}>Pre-selected</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                    <label>School/Institution Name <span className="required">*</span></label>
                                    <input type="text" className="input-outline" placeholder="Search or add school.." value={formData.previousEducation.classX.schoolName} onChange={(e) => handlePreviousEducationChange('classX', 'schoolName', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Select Board/University <span className="required">*</span></label>
                                    <input type="text" className="input-outline" placeholder="Search or add board..." value={formData.previousEducation.classX.board} onChange={(e) => handlePreviousEducationChange('classX', 'board', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Select Program/Degree/Certificate <span className="required">*</span></label>
                                    <input type="text" className="input-outline" value="Class X" disabled style={{ background: '#f8fafc' }} />
                                </div>
                                <div className="input-group">
                                    <label>Select Education Type <span className="required">*</span></label>
                                    <select className="input-outline" value={formData.previousEducation.classX.educationType} onChange={(e) => handlePreviousEducationChange('classX', 'educationType', e.target.value)}>
                                        <option value="">Select Type</option>
                                        <option value="Full Time">Full Time</option>
                                        <option value="Part Time">Part Time</option>
                                        <option value="Distance">Distance</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Select Start Year & End Year <span className="required">*</span></label>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        <input type="number" className="input-outline" placeholder="Start Year" style={{ flex: 1 }} value={formData.previousEducation.classX.startYear} onChange={(e) => handlePreviousEducationChange('classX', 'startYear', e.target.value)} />
                                        <input type="number" className="input-outline" placeholder="End Year" style={{ flex: 1 }} value={formData.previousEducation.classX.endYear} onChange={(e) => handlePreviousEducationChange('classX', 'endYear', e.target.value)} />
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>Score in Percentage <span className="required">*</span></label>
                                    <input type="text" className="input-outline" placeholder="Enter percentage" value={formData.previousEducation.classX.percentage} onChange={(e) => handlePreviousEducationChange('classX', 'percentage', e.target.value)} />
                                </div>
                                <div className="input-group">
                                    <label>Your CGPA</label>
                                    <div style={{ display: 'flex' }}>
                                        <input type="text" className="input-outline" placeholder="Your CGPA" style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }} value={formData.previousEducation.classX.cgpa} onChange={(e) => handlePreviousEducationChange('classX', 'cgpa', e.target.value)} />
                                        <span style={{ padding: '0 12px', background: '#f8fafc', border: '1px solid #777', borderLeft: 'none', borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center', color: '#64748b' }}>CGPA</span>
                                    </div>
                                </div>
                                <div className="input-group">
                                    <label>Total CGPA</label>
                                    <div style={{ display: 'flex' }}>
                                        <input type="text" className="input-outline" placeholder="Total CGPA" style={{ flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0 }} value={formData.previousEducation.classX.totalCgpa} onChange={(e) => handlePreviousEducationChange('classX', 'totalCgpa', e.target.value)} />
                                        <span style={{ padding: '0 12px', background: '#f8fafc', border: '1px solid #777', borderLeft: 'none', borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center', color: '#64748b' }}>CGPA</span>
                                    </div>
                                </div>
                                <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                    <label>Notes/Highlights</label>
                                    <textarea className="input-outline" placeholder="You can mention your class/department/university ranks or other highlights, if any" style={{ minHeight: '80px', width: '100%' }} value={formData.previousEducation.classX.notes} onChange={(e) => handlePreviousEducationChange('classX', 'notes', e.target.value)} />
                                </div>
                            </div>
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                <button className="btn-primary" onClick={handleSave} style={{ background: '#4f46e5' }}>Save CLASS X</button>
                            </div>
                        </div>
                    </div>
                );
            case 'External Profiles':
                const platformIcons = {
                    github: '🐙',
                    linkedin: '💼',
                    twitter: '🐦',
                    instagram: '📸',
                    website: '🌐',
                    leetcode: '💻'
                };

                const platformNames = {
                    github: 'GitHub',
                    linkedin: 'LinkedIn',
                    twitter: 'Twitter',
                    instagram: 'Instagram',
                    website: 'Website',
                    leetcode: 'LeetCode'
                };

                // Filter active profiles (those with values)
                const activeProfiles = Object.entries(formData.socialLinks).filter(([key, value]) => value && value.trim() !== '');

                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', color: '#1e293b' }}>Your External Profiles</h3>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Connect and showcase your professional profiles to stand out.</p>
                            </div>
                            <button className="btn-primary" onClick={() => setShowAddProfile(true)} style={{ background: '#0f172a', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <span>+</span> Add profile
                            </button>
                        </div>

                        {/* List of Connected Profiles */}
                        <div className="profiles-list" style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                            {activeProfiles.length === 0 && !showAddProfile && (
                                <div style={{ textAlign: 'center', padding: '30px', background: '#f8fafc', borderRadius: '12px', color: '#64748b' }}>
                                    No profiles connected yet. Click "Add profile" to start.
                                </div>
                            )}
                            {activeProfiles.map(([key, value]) => (
                                <div key={key} style={{
                                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                    padding: '20px', backgroundColor: 'white', borderRadius: '12px',
                                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e2e8f0'
                                }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <div style={{
                                            width: '40px', height: '40px', borderRadius: '50%', background: '#eff6ff',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
                                        }}>
                                            {platformIcons[key]}
                                        </div>
                                        <div>
                                            <h4 style={{ margin: '0 0 2px', textTransform: 'capitalize', color: '#334155' }}>
                                                {/* Use username or just platform name + generic handle? The screenshot shows 'kaladharroyal' (username) and 'LinkedIn' (Platform) below it. 
                                                   Since we store full URL, we can parse it or just show Platform Name as title and URL as subtitle. 
                                                   Screenshot shows: Title=Username, Subtitle=Platform. 
                                                   I will simplify to Title=Platform, Subtitle=URL (truncated) for now as capturing username is safer than guessing.
                                                   Actually, let's reverse it to match screenshot style: Title = Platform Name, Subtitle = URL.
                                                */}
                                                {platformNames[key]}
                                            </h4>
                                            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>{value}</p>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '10px' }}>
                                        {/* Verify Button - visual only */}
                                        {key === 'leetcode' && ( // just mimicking screenshot where one has verify
                                            <button style={{
                                                padding: '6px 16px', background: '#f59e0b', color: 'white', border: 'none',
                                                borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer'
                                            }}>
                                                Verify
                                            </button>
                                        )}
                                        <button
                                            onClick={() => {
                                                setEditingProfile({ key, value });
                                                setShowAddProfile(true);
                                            }}
                                            style={{
                                                width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #e2e8f0',
                                                background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                                            }}
                                        >
                                            ✏️
                                        </button>
                                        <button
                                            onClick={() => handleSocialChange({ target: { name: key, value: '' } })}
                                            style={{
                                                width: '36px', height: '36px', borderRadius: '8px', border: '1px solid #e2e8f0',
                                                background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444'
                                            }}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Add/Edit Profile Form */}
                        {showAddProfile && (
                            <div className="add-profile-form" style={{ padding: '20px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
                                <h4 style={{ marginTop: 0, marginBottom: '15px' }}>{editingProfile ? 'Edit Profile' : 'Add New Profile'}</h4>
                                <div className="input-group">
                                    <label>Select Platform</label>
                                    <select
                                        className="input-outline"
                                        value={editingProfile ? editingProfile.key : (Object.keys(formData.socialLinks).find(k => !formData.socialLinks[k]) || '')}
                                        onChange={(e) => {
                                            if (!editingProfile) {
                                                // Just a visual selection if we were strictly adding, but here we just need to find which key to update.
                                                // Actually, simpler to just start fresh.
                                                setEditingProfile({ key: e.target.value, value: formData.socialLinks[e.target.value] || '' });
                                            }
                                        }}
                                        disabled={!!editingProfile} // Lock platform when editing existing
                                    >
                                        <option value="">Select a platform...</option>
                                        {Object.keys(formData.socialLinks).map(key => (
                                            <option key={key} value={key} disabled={!editingProfile && !!formData.socialLinks[key]}>
                                                {platformNames[key]} {formData.socialLinks[key] ? '(Connected)' : ''}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Profile URL</label>
                                    <input
                                        type="text"
                                        className="input-outline"
                                        placeholder="https://..."
                                        value={editingProfile ? editingProfile.value : ''}
                                        onChange={(e) => setEditingProfile({ ...editingProfile, value: e.target.value })}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                                    <button
                                        className="btn-primary"
                                        onClick={() => {
                                            if (editingProfile && editingProfile.key) {
                                                handleSocialChange({ target: { name: editingProfile.key, value: editingProfile.value } });
                                                setShowAddProfile(false);
                                                setEditingProfile(null);
                                            }
                                        }}
                                    >
                                        Save Profile
                                    </button>
                                    <button
                                        className="btn-secondary"
                                        onClick={() => {
                                            setShowAddProfile(false);
                                            setEditingProfile(null);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Global Save - although individual add/remove updates state, user might want to persist everything */}
                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Resume':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#1e293b' }}>Upload your resume here</h3>
                        </div>

                        <div
                            className="upload-area"
                            style={{
                                border: '2px dashed #cbd5e1',
                                borderRadius: '12px',
                                padding: '60px 20px',
                                textAlign: 'center',
                                background: '#fff',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                marginBottom: '10px'
                            }}
                        >
                            <div style={{ marginBottom: '15px' }}>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    width: '40px', height: '40px', borderRadius: '50%', background: 'black', color: 'white', fontSize: '1.5rem'
                                }}>+</span>
                            </div>
                            <h5 style={{ margin: '0 0 5px', color: '#334155', fontWeight: '500' }}>Drag & drop here</h5>
                            <input
                                type="file"
                                accept=".pdf"
                                style={{ display: 'none' }}
                                onChange={(e) => alert('Resume upload functionality coming soon!')}
                            />
                        </div>
                        <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#64748b' }}>
                            * Only PDF files under 2MB are accepted
                        </div>

                        {formData.resume && (
                            <div style={{ marginTop: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '1.2rem' }}>📄</span>
                                <div style={{ flex: 1 }}>
                                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#0369a1', fontWeight: '500' }}>Uploaded Resume</p>
                                    <a href={formData.resume} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#0284c7', textDecoration: 'underline' }}>View Resume</a>
                                </div>
                                <button
                                    onClick={() => setFormData({ ...formData, resume: '' })}
                                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.1rem' }}
                                >
                                    🗑️
                                </button>
                            </div>
                        )}

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Skills':
                const proficiencyColors = {
                    'Beginner': '#22c55e',
                    'Intermediate': '#f97316',
                    'Advanced': '#3b82f6',
                    'Expert': '#ef4444'
                };

                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#1e293b' }}>YOUR SKILLS</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>List all your relevant skills.</p>
                        </div>

                        {/* Existing Skills List */}
                        {formData.skills && formData.skills.length > 0 && (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
                                {formData.skills.map((skill, index) => (
                                    <div key={index} style={{
                                        display: 'flex', alignItems: 'center', gap: '8px',
                                        background: 'white', padding: '8px 16px', borderRadius: '20px',
                                        border: '1px solid #e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                    }}>
                                        <span style={{
                                            width: '8px', height: '8px', borderRadius: '50%',
                                            background: proficiencyColors[skill.level] || '#cbd5e1'
                                        }}></span>
                                        <span style={{ fontWeight: '500', color: '#334155' }}>{skill.name}</span>
                                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>({skill.level})</span>
                                        <button
                                            onClick={() => handleRemoveSkill(index)}
                                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', marginLeft: '5px', fontSize: '1.1rem' }}
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add New Skill Card */}
                        <div className="card-ui" style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                            <h4 style={{ margin: '0 0 20px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: '#6366f1', background: '#e0e7ff', padding: '4px', borderRadius: '6px' }}>&lt;/&gt;</span> Add New Skill
                            </h4>

                            <div className="input-group">
                                <label>Skill Name <span className="required">*</span></label>
                                <input
                                    type="text"
                                    className="input-outline"
                                    placeholder="Search or Add a New Skill..."
                                    value={newSkill.name}
                                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                                />
                            </div>

                            <div className="input-group">
                                <label>Proficiency Level <span className="required">*</span></label>
                                <select
                                    className="input-outline"
                                    value={newSkill.level}
                                    onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                                >
                                    <option value="">Select proficiency level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </div>

                            {/* Proficiency Legend/Selectors */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
                                {Object.entries(proficiencyColors).map(([level, color]) => (
                                    <div
                                        key={level}
                                        onClick={() => setNewSkill({ ...newSkill, level })}
                                        style={{
                                            display: 'flex', alignItems: 'center', gap: '10px',
                                            cursor: 'pointer', padding: '10px', borderRadius: '8px',
                                            background: newSkill.level === level ? '#f8fafc' : 'transparent',
                                            border: newSkill.level === level ? '1px solid #e2e8f0' : '1px solid transparent'
                                        }}
                                    >
                                        <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: color }}></span>
                                        <span style={{ color: '#475569', fontSize: '0.9rem' }}>{level}</span>
                                    </div>
                                ))}
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <button
                                    className="btn-primary"
                                    onClick={handleAddSkill}
                                    style={{ background: '#4f46e5' }}
                                >
                                    Add Skill
                                </button>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Work':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#1e293b' }}>Work Experience</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Share your professional journey</p>
                        </div>
                        {/* No Experience Checkbox */}
                        <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="noExperience"
                                checked={formData.hasNoWorkExperience}
                                onChange={(e) => setFormData({ ...formData, hasNoWorkExperience: e.target.checked })}
                                style={{ width: '16px', height: '16px', marginRight: '10px' }}
                            />
                            <label htmlFor="noExperience" style={{ color: '#64748b', cursor: 'pointer' }}>I'm yet to find my first Opportunity</label>
                        </div>

                        {/* Existing Work List */}
                        {formData.workExperience && formData.workExperience.map((work, index) => (
                            <div key={index} className="card-ui" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px', color: '#1e293b', fontSize: '1.1rem' }}>{work.role}</h4>
                                        <p style={{ margin: '0 0 5px', color: '#4f46e5', fontWeight: '500' }}>{work.organization}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                                            {work.startDate ? new Date(work.startDate).toLocaleDateString() : ''} - {work.currentlyWorking ? 'Present' : (work.endDate ? new Date(work.endDate).toLocaleDateString() : '')} • {work.location}
                                        </p>
                                    </div>
                                    <button onClick={() => handleRemoveWork(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                                </div>
                            </div>
                        ))}

                        {/* Add Work Form */}
                        {!formData.hasNoWorkExperience && (
                            <div className="card-ui" style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <h4 style={{ margin: '0 0 20px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: '#8b5cf6', background: '#f3e8ff', padding: '4px', borderRadius: '6px' }}>💼</span> Add Work Experience
                                </h4>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="input-group">
                                        <label>Organization <span className="required">*</span></label>
                                        <input type="text" className="input-outline" value={newWork.organization} onChange={(e) => setNewWork({ ...newWork, organization: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Role <span className="required">*</span></label>
                                        <input type="text" className="input-outline" value={newWork.role} onChange={(e) => setNewWork({ ...newWork, role: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Type of Employment <span className="required">*</span></label>
                                        <select className="input-outline" value={newWork.employmentType} onChange={(e) => setNewWork({ ...newWork, employmentType: e.target.value })}>
                                            <option value="">Select type</option>
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Internship">Internship</option>
                                            <option value="Freelance">Freelance</option>
                                        </select>
                                    </div>
                                    <div className="input-group">
                                        <label>Industry <span className="required">*</span></label>
                                        <select className="input-outline" value={newWork.industry} onChange={(e) => setNewWork({ ...newWork, industry: e.target.value })}>
                                            <option value="">Select industry</option>
                                            <option value="IT">IT</option>
                                            <option value="Finance">Finance</option>
                                            <option value="Education">Education</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Location</label>
                                        <input type="text" className="input-outline" value={newWork.location} onChange={(e) => setNewWork({ ...newWork, location: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>What skills you have learnt/worked at this work/Internship? <span className="required">*</span></label>
                                        <input type="text" className="input-outline" placeholder="Search or Add.." value={newWork.skills} onChange={(e) => setNewWork({ ...newWork, skills: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Start date <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newWork.startDate} onChange={(e) => setNewWork({ ...newWork, startDate: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>End date <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newWork.endDate} onChange={(e) => setNewWork({ ...newWork, endDate: e.target.value })} disabled={newWork.currentlyWorking} />
                                    </div>
                                    <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="checkbox"
                                            id="currentWork"
                                            checked={newWork.currentlyWorking}
                                            onChange={(e) => setNewWork({ ...newWork, currentlyWorking: e.target.checked })}
                                            style={{ width: '16px', height: '16px', marginRight: '10px' }}
                                        />
                                        <label htmlFor="currentWork">I'm currently working here</label>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Description</label>
                                        <textarea className="input-outline" style={{ minHeight: '100px' }} value={newWork.description} onChange={(e) => setNewWork({ ...newWork, description: e.target.value })}></textarea>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn-primary" onClick={handleAddWork} style={{ background: '#4f46e5' }}>Add Work</button>
                                </div>
                            </div>
                        )}

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Projects':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px', textAlign: 'center' }}>
                            {formData.projects.length === 0 && !formData.hasNoProjects && (
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '2.5rem', color: '#cbd5e1', marginBottom: '10px' }}>📂</div>
                                    <p style={{ color: '#64748b' }}>No projects added yet</p>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Add your projects to showcase your practical experience and technical skills</p>
                                </div>
                            )}
                        </div>

                        {/* No Projects Checkbox */}
                        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="noProjects"
                                checked={formData.hasNoProjects}
                                onChange={(e) => setFormData({ ...formData, hasNoProjects: e.target.checked })}
                                style={{ width: '16px', height: '16px', marginRight: '10px' }}
                            />
                            <label htmlFor="noProjects" style={{ color: '#64748b', cursor: 'pointer' }}>I've not done any projects</label>
                        </div>

                        {/* Projects List */}
                        {formData.projects && formData.projects.map((proj, index) => (
                            <div key={index} className="card-ui" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px', color: '#1e293b', fontSize: '1.1rem' }}>{proj.name}</h4>
                                        <p style={{ margin: '0 0 5px', color: '#4f46e5', fontWeight: '500' }}>{proj.domain}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                                            {proj.startDate ? new Date(proj.startDate).toLocaleDateString() : ''} - {proj.currentlyWorking ? 'Present' : (proj.endDate ? new Date(proj.endDate).toLocaleDateString() : '')}
                                        </p>
                                        <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '5px' }}>Skills: {proj.skills}</p>
                                    </div>
                                    <button onClick={() => handleRemoveProject(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                                </div>
                            </div>
                        ))}

                        {/* Add Project Form */}
                        {!formData.hasNoProjects && (
                            <div className="card-ui" style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <h4 style={{ margin: '0 0 20px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: '#6366f1', background: '#e0e7ff', padding: '4px', borderRadius: '6px' }}>📂</span> Add New Project
                                </h4>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Project name <span className="required">*</span></label>
                                        <input type="text" className="input-outline" value={newProject.name} onChange={(e) => setNewProject({ ...newProject, name: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Project domain <span className="required">*</span></label>
                                        <input type="text" className="input-outline" placeholder="Search or Add.." value={newProject.domain} onChange={(e) => setNewProject({ ...newProject, domain: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Start date <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newProject.startDate} onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>End date <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newProject.endDate} onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })} disabled={newProject.currentlyWorking} />
                                    </div>
                                    <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="checkbox"
                                            id="currentProject"
                                            checked={newProject.currentlyWorking}
                                            onChange={(e) => setNewProject({ ...newProject, currentlyWorking: e.target.checked })}
                                            style={{ width: '16px', height: '16px', marginRight: '10px' }}
                                        />
                                        <label htmlFor="currentProject">I'm currently working on this project</label>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Select skills used in the project <span className="required">*</span></label>
                                        <input type="text" className="input-outline" placeholder="Search or Add.." value={newProject.skills} onChange={(e) => setNewProject({ ...newProject, skills: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Description <span className="required">*</span></label>
                                        <textarea className="input-outline" style={{ minHeight: '100px' }} value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}></textarea>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Project Link</label>
                                        <input type="text" className="input-outline" value={newProject.link} onChange={(e) => setNewProject({ ...newProject, link: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Level of Completion</label>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>0%</span>
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={newProject.completionLevel}
                                                onChange={(e) => setNewProject({ ...newProject, completionLevel: parseInt(e.target.value) })}
                                                style={{ flex: 1 }}
                                            />
                                            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>100%</span>
                                        </div>
                                        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#4f46e5', marginTop: '5px' }}>{newProject.completionLevel}%</div>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn-primary" onClick={handleAddProject} style={{ background: '#4f46e5' }}>Add Project</button>
                                </div>
                            </div>
                        )}

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Mentoring':
                return (
                    <div className="form-section">
                        <div style={{ marginBottom: '30px' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '1.4rem' }}>👥</span> Mentoring Availability
                            </h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem', marginTop: '5px' }}>
                                Toggle your availability to become a mentor and help others in their learning journey
                            </p>
                        </div>

                        <div className="card-ui" style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h4 style={{ margin: '0 0 5px', color: '#334155' }}>I'm available to become a mentor</h4>
                                <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b', maxWidth: '400px' }}>
                                    When enabled, you'll appear in mentor listings and can receive mentorship requests
                                </p>
                            </div>
                            <div className="toggle-switch">
                                <label className="switch" style={{ position: 'relative', display: 'inline-block', width: '50px', height: '24px' }}>
                                    <input
                                        type="checkbox"
                                        checked={formData.isAvailableForMentoring}
                                        onChange={(e) => setFormData({ ...formData, isAvailableForMentoring: e.target.checked })}
                                        style={{ opacity: 0, width: 0, height: 0 }}
                                    />
                                    <span style={{
                                        position: 'absolute', cursor: 'pointer', top: 0, left: 0, right: 0, bottom: 0,
                                        backgroundColor: formData.isAvailableForMentoring ? '#4f46e5' : '#ccc',
                                        transition: '.4s', borderRadius: '34px'
                                    }}>
                                        <span style={{
                                            position: 'absolute', content: '""', height: '18px', width: '18px', left: formData.isAvailableForMentoring ? '28px' : '4px', bottom: '3px',
                                            backgroundColor: 'white', transition: '.4s', borderRadius: '50%'
                                        }}></span>
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div style={{
                            display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '15px', marginTop: '40px'
                        }}>
                            <button
                                className="btn-secondary"
                                onClick={() => setIsEditing(false)}
                                style={{ border: '1px solid #e2e8f0', padding: '8px 20px' }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn-primary"
                                onClick={handleSave}
                                style={{ background: '#0f172a', padding: '8px 20px' }} // Dark button as per screenshot
                            >
                                Save Mentoring Profile
                            </button>
                        </div>
                    </div>
                );
            case 'Achievements':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px', textAlign: 'center' }}>
                            {formData.achievements.length === 0 && !formData.hasNoAchievements && (
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '2.5rem', color: '#cbd5e1', marginBottom: '10px' }}>🏆</div>
                                    <p style={{ color: '#64748b' }}>No achievements added yet</p>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Add your first achievement to showcase your accomplishments</p>
                                </div>
                            )}
                        </div>

                        {/* No Achievements Checkbox */}
                        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="noAchievements"
                                checked={formData.hasNoAchievements}
                                onChange={(e) => setFormData({ ...formData, hasNoAchievements: e.target.checked })}
                                style={{ width: '16px', height: '16px', marginRight: '10px' }}
                            />
                            <label htmlFor="noAchievements" style={{ color: '#64748b', cursor: 'pointer' }}>I don't have any achievements</label>
                        </div>

                        {/* Achievements List */}
                        {formData.achievements && formData.achievements.map((ach, index) => (
                            <div key={index} className="card-ui" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px', color: '#1e293b', fontSize: '1.1rem' }}>{ach.title}</h4>
                                        <p style={{ margin: '0 0 5px', color: '#4f46e5', fontWeight: '500' }}>{ach.issuer}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                                            {new Date(ach.issueDate).toLocaleDateString()}
                                        </p>
                                        {ach.description && <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '10px' }}>{ach.description}</p>}
                                    </div>
                                    <button onClick={() => handleRemoveAchievement(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                                </div>
                            </div>
                        ))}

                        {/* Add Achievement Form */}
                        {!formData.hasNoAchievements && (
                            <div className="card-ui" style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <h4 style={{ margin: '0 0 20px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: '#6366f1', background: '#e0e7ff', padding: '4px', borderRadius: '6px' }}>🏆</span> Add New Achievement
                                </h4>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Title <span className="required">*</span></label>
                                        <input type="text" className="input-outline" placeholder="e.g. First Place in National Coding Competition" value={newAchievement.title} onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Issuer <span className="required">*</span></label>
                                        <input type="text" className="input-outline" placeholder="e.g. IEEE, ACM, University" value={newAchievement.issuer} onChange={(e) => setNewAchievement({ ...newAchievement, issuer: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Issue Date <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newAchievement.issueDate} onChange={(e) => setNewAchievement({ ...newAchievement, issueDate: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Description</label>
                                        <textarea className="input-outline" style={{ minHeight: '100px' }} placeholder="Describe your achievement and its significance..." value={newAchievement.description} onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}></textarea>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn-primary" onClick={handleAddAchievement} style={{ background: '#4f46e5' }}>Add Achievement</button>
                                </div>
                            </div>
                        )}

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Competitions':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px', textAlign: 'center' }}>
                            {formData.competitions.length === 0 && !formData.hasNoCompetitions && (
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '2.5rem', color: '#cbd5e1', marginBottom: '10px' }}>🏁</div>
                                    <p style={{ color: '#64748b' }}>No competitions added yet</p>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Add your first competition to showcase your competitive achievements</p>
                                </div>
                            )}
                        </div>

                        {/* No Competitions Checkbox */}
                        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="noCompetitions"
                                checked={formData.hasNoCompetitions}
                                onChange={(e) => setFormData({ ...formData, hasNoCompetitions: e.target.checked })}
                                style={{ width: '16px', height: '16px', marginRight: '10px' }}
                            />
                            <label htmlFor="noCompetitions" style={{ color: '#64748b', cursor: 'pointer' }}>I don't have any competitions</label>
                        </div>

                        {/* Competitions List */}
                        {formData.competitions && formData.competitions.map((comp, index) => (
                            <div key={index} className="card-ui" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px', color: '#1e293b', fontSize: '1.1rem' }}>{comp.title}</h4>
                                        <p style={{ margin: '0 0 5px', color: '#4f46e5', fontWeight: '500' }}>{comp.hostedBy}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                                            {new Date(comp.eventDate).toLocaleDateString()} • {comp.mode} • {comp.outcome}
                                        </p>
                                        {comp.description && <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '10px' }}>{comp.description}</p>}
                                    </div>
                                    <button onClick={() => handleRemoveCompetition(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                                </div>
                            </div>
                        ))}

                        {/* Add Competition Form */}
                        {!formData.hasNoCompetitions && (
                            <div className="card-ui" style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <h4 style={{ margin: '0 0 20px', color: '#334155', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span style={{ color: '#6366f1', background: '#e0e7ff', padding: '4px', borderRadius: '6px' }}>🏁</span> Add New Competition
                                </h4>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Competition Title <span className="required">*</span></label>
                                        <input type="text" className="input-outline" placeholder="e.g. International Coding Challenge 2024" value={newCompetition.title} onChange={(e) => setNewCompetition({ ...newCompetition, title: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Hosted By <span className="required">*</span></label>
                                        <input type="text" className="input-outline" placeholder="e.g. Google, HackerRank" value={newCompetition.hostedBy} onChange={(e) => setNewCompetition({ ...newCompetition, hostedBy: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Event Date <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newCompetition.eventDate} onChange={(e) => setNewCompetition({ ...newCompetition, eventDate: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Mode <span className="required">*</span></label>
                                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '42px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <input type="radio" id="online" name="mode" value="Online" checked={newCompetition.mode === 'Online'} onChange={(e) => setNewCompetition({ ...newCompetition, mode: e.target.value })} />
                                                <label htmlFor="online">Online</label>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <input type="radio" id="offline" name="mode" value="Offline" checked={newCompetition.mode === 'Offline'} onChange={(e) => setNewCompetition({ ...newCompetition, mode: e.target.value })} />
                                                <label htmlFor="offline">Offline</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label>Outcome <span className="required">*</span></label>
                                        <select className="input-outline" value={newCompetition.outcome} onChange={(e) => setNewCompetition({ ...newCompetition, outcome: e.target.value })}>
                                            <option value="">Select outcome</option>
                                            <option value="Winner">Winner</option>
                                            <option value="Runner Up">Runner Up</option>
                                            <option value="Finalist">Finalist</option>
                                            <option value="Participant">Participant</option>
                                            <option value="Top 10">Top 10</option>
                                        </select>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Description</label>
                                        <textarea className="input-outline" style={{ minHeight: '100px' }} placeholder="Describe your competition experience and achievements..." value={newCompetition.description} onChange={(e) => setNewCompetition({ ...newCompetition, description: e.target.value })}></textarea>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                                    <button className="btn-primary" onClick={handleAddCompetition} style={{ background: '#4f46e5' }}>Add Competition</button>
                                </div>
                            </div>
                        )}

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Certifications':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px', textAlign: 'center' }}>
                            {formData.certifications.length === 0 && !formData.hasNoCertifications && (
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '2.5rem', color: '#cbd5e1', marginBottom: '10px' }}>🏅</div>
                                    <p style={{ color: '#64748b' }}>No certifications added yet</p>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Add your professional certifications to showcase your validated expertise</p>
                                </div>
                            )}
                        </div>

                        {/* No Certifications Checkbox */}
                        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="noCertifications"
                                checked={formData.hasNoCertifications}
                                onChange={(e) => setFormData({ ...formData, hasNoCertifications: e.target.checked })}
                                style={{ width: '16px', height: '16px', marginRight: '10px' }}
                            />
                            <label htmlFor="noCertifications" style={{ color: '#64748b', cursor: 'pointer' }}>I don't have any certifications</label>
                        </div>

                        {/* Certifications List */}
                        {formData.certifications && formData.certifications.map((cert, index) => (
                            <div key={index} className="card-ui" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px', color: '#1e293b', fontSize: '1.1rem' }}>{cert.title}</h4>
                                        <p style={{ margin: '0 0 5px', color: '#4f46e5', fontWeight: '500' }}>{cert.issuer}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                                            Issued: {new Date(cert.issueDate).toLocaleDateString()}
                                            {cert.expiryDate && ` • Expires: ${new Date(cert.expiryDate).toLocaleDateString()} `}
                                            {cert.doesNotExpire && ` • Does not expire`}
                                        </p>
                                        <p style={{ margin: '5px 0 0', fontSize: '0.9rem', color: '#64748b' }}>{cert.mode}</p>
                                        {cert.credentialUrl && <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: '#4f46e5', display: 'block', marginTop: '5px' }}>View Credential</a>}
                                        {cert.description && <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '10px' }}>{cert.description}</p>}
                                    </div>
                                    <button onClick={() => handleRemoveCertification(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                                </div>
                            </div>
                        ))}

                        {/* Add Certification Form */}
                        {!formData.hasNoCertifications && (
                            <div className="card-ui" style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="input-group">
                                        <label>Title <span className="required">*</span></label>
                                        <input type="text" className="input-outline" value={newCertification.title} onChange={(e) => setNewCertification({ ...newCertification, title: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Issuer <span className="required">*</span></label>
                                        <input type="text" className="input-outline" value={newCertification.issuer} onChange={(e) => setNewCertification({ ...newCertification, issuer: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Issue Date <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newCertification.issueDate} onChange={(e) => setNewCertification({ ...newCertification, issueDate: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Expiry Date</label>
                                        <input type="date" className="input-outline" value={newCertification.expiryDate} onChange={(e) => setNewCertification({ ...newCertification, expiryDate: e.target.value })} disabled={newCertification.doesNotExpire} />
                                    </div>
                                    <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center' }}>
                                        <input
                                            type="checkbox"
                                            id="doesNotExpire"
                                            checked={newCertification.doesNotExpire}
                                            onChange={(e) => setNewCertification({ ...newCertification, doesNotExpire: e.target.checked })}
                                            style={{ marginRight: '10px' }}
                                        />
                                        <label htmlFor="doesNotExpire">This certificate does not expire</label>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Mode <span className="required">*</span></label>
                                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '42px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <input type="radio" id="certOnline" name="certMode" value="Online" checked={newCertification.mode === 'Online'} onChange={(e) => setNewCertification({ ...newCertification, mode: e.target.value })} />
                                                <label htmlFor="certOnline">Online</label>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <input type="radio" id="certOffline" name="certMode" value="Offline" checked={newCertification.mode === 'Offline'} onChange={(e) => setNewCertification({ ...newCertification, mode: e.target.value })} />
                                                <label htmlFor="certOffline">Offline</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Credential URL</label>
                                        <input type="text" className="input-outline" value={newCertification.credentialUrl} onChange={(e) => setNewCertification({ ...newCertification, credentialUrl: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Description</label>
                                        <textarea className="input-outline" style={{ minHeight: '100px' }} value={newCertification.description} onChange={(e) => setNewCertification({ ...newCertification, description: e.target.value })}></textarea>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                                    <button className="btn-primary" onClick={handleAddCertification} style={{ background: '#000', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}>Add Certification</button>
                                </div>
                            </div>
                        )}

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Publications':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px', textAlign: 'center' }}>
                            {formData.publications.length === 0 && !formData.hasNoPublications && (
                                <div style={{ marginBottom: '20px' }}>
                                    <div style={{ fontSize: '2.5rem', color: '#cbd5e1', marginBottom: '10px' }}>📖</div>
                                    <p style={{ color: '#64748b' }}>No publications added yet</p>
                                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Add your research papers and publications to showcase your academic contributions</p>
                                </div>
                            )}
                        </div>

                        {/* No Publications Checkbox */}
                        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="noPublications"
                                checked={formData.hasNoPublications}
                                onChange={(e) => setFormData({ ...formData, hasNoPublications: e.target.checked })}
                                style={{ width: '16px', height: '16px', marginRight: '10px' }}
                            />
                            <label htmlFor="noPublications" style={{ color: '#64748b', cursor: 'pointer' }}>I've not published any paper</label>
                        </div>

                        {/* Publications List */}
                        {formData.publications && formData.publications.map((pub, index) => (
                            <div key={index} className="card-ui" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px', color: '#1e293b', fontSize: '1.1rem' }}>{pub.title}</h4>
                                        <p style={{ margin: '0 0 5px', color: '#4f46e5', fontWeight: '500' }}>{pub.publisher}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                                            Published: {new Date(pub.publishDate).toLocaleDateString()}
                                        </p>
                                        {pub.link && <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.9rem', color: '#4f46e5', display: 'block', marginTop: '5px' }}>View Publication</a>}
                                        {pub.description && <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '10px' }}>{pub.description}</p>}
                                    </div>
                                    <button onClick={() => handleRemovePublication(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                                </div>
                            </div>
                        ))}

                        {/* Add Publication Form */}
                        {!formData.hasNoPublications && (
                            <div className="card-ui" style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="input-group">
                                        <label>Title <span className="required">*</span></label>
                                        <input type="text" className="input-outline" value={newPublication.title} onChange={(e) => setNewPublication({ ...newPublication, title: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Publisher <span className="required">*</span></label>
                                        <input type="text" className="input-outline" value={newPublication.publisher} onChange={(e) => setNewPublication({ ...newPublication, publisher: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Publish Date <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newPublication.publishDate} onChange={(e) => setNewPublication({ ...newPublication, publishDate: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Publication Link</label>
                                        <input type="text" className="input-outline" value={newPublication.link} onChange={(e) => setNewPublication({ ...newPublication, link: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Description</label>
                                        <textarea className="input-outline" style={{ minHeight: '100px' }} value={newPublication.description} onChange={(e) => setNewPublication({ ...newPublication, description: e.target.value })}></textarea>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                                    <button className="btn-primary" onClick={handleAddPublication} style={{ background: '#000', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}>Add Publication</button>
                                </div>
                            </div>
                        )}

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Events':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#1e293b' }}>EVENTS</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Tell us about the events/workshops you've attended</p>
                        </div>

                        {/* No Events Checkbox */}
                        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
                            <input
                                type="checkbox"
                                id="noEvents"
                                checked={formData.hasNoEvents}
                                onChange={(e) => setFormData({ ...formData, hasNoEvents: e.target.checked })}
                                style={{ width: '16px', height: '16px', marginRight: '10px' }}
                            />
                            <label htmlFor="noEvents" style={{ color: '#64748b', cursor: 'pointer' }}>I've not done any workshops</label>
                        </div>

                        {/* Events List */}
                        {formData.events && formData.events.map((evt, index) => (
                            <div key={index} className="card-ui" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px', color: '#1e293b', fontSize: '1.1rem' }}>{evt.title}</h4>
                                        <p style={{ margin: '0 0 5px', color: '#4f46e5', fontWeight: '500' }}>{evt.organizer}</p>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>
                                            {new Date(evt.conductedOn).toLocaleDateString()} • {evt.mode} • {evt.type}
                                        </p>
                                        {evt.description && <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '10px' }}>{evt.description}</p>}
                                    </div>
                                    <button onClick={() => handleRemoveEvent(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                                </div>
                            </div>
                        ))}

                        {/* Add Event Form */}
                        {!formData.hasNoEvents && (
                            <div className="card-ui" style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Title <span className="required">*</span></label>
                                        <input type="text" className="input-outline" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Conducted on <span className="required">*</span></label>
                                        <input type="date" className="input-outline" value={newEvent.conductedOn} onChange={(e) => setNewEvent({ ...newEvent, conductedOn: e.target.value })} />
                                    </div>
                                    <div className="input-group">
                                        <label>Organizer <span className="required">*</span></label>
                                        <input type="text" className="input-outline" value={newEvent.organizer} onChange={(e) => setNewEvent({ ...newEvent, organizer: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Skills acquired <span className="required">*</span></label>
                                        <input type="text" className="input-outline" placeholder="Search or Add..." value={newEvent.skillsAcquired} onChange={(e) => setNewEvent({ ...newEvent, skillsAcquired: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Type <span className="required">*</span></label>
                                        <select className="input-outline" value={newEvent.type} onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}>
                                            <option value="">Select type</option>
                                            <option value="Workshop">Workshop</option>
                                            <option value="Seminar">Seminar</option>
                                            <option value="Conference">Conference</option>
                                            <option value="Webinar">Webinar</option>
                                            <option value="Hackathon">Hackathon</option>
                                            <option value="Bootcamp">Bootcamp</option>
                                        </select>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Mode <span className="required">*</span></label>
                                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', height: '42px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <input type="radio" id="eventOnline" name="eventMode" value="Online" checked={newEvent.mode === 'Online'} onChange={(e) => setNewEvent({ ...newEvent, mode: e.target.value })} />
                                                <label htmlFor="eventOnline">Online</label>
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                                <input type="radio" id="eventOffline" name="eventMode" value="Offline" checked={newEvent.mode === 'Offline'} onChange={(e) => setNewEvent({ ...newEvent, mode: e.target.value })} />
                                                <label htmlFor="eventOffline">Offline</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Location</label>
                                        <input type="text" className="input-outline" value={newEvent.location} onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
                                    </div>
                                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                                        <label>Description</label>
                                        <textarea className="input-outline" style={{ minHeight: '100px' }} value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}></textarea>
                                    </div>
                                </div>
                                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                                    <button className="btn-primary" onClick={handleAddEvent} style={{ background: '#000', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}>Add Workshop</button>
                                </div>
                            </div>
                        )}

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Languages':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#1e293b' }}>LANGUAGES</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Add languages you know</p>
                        </div>

                        {/* Languages List */}
                        {formData.languages && formData.languages.map((lang, index) => (
                            <div key={index} className="card-ui" style={{ marginBottom: '20px', padding: '20px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h4 style={{ margin: '0 0 5px', color: '#1e293b', fontSize: '1.1rem' }}>{lang.language}</h4>
                                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#64748b' }}>{lang.level}</p>
                                    </div>
                                    <button onClick={() => handleRemoveLanguage(index)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '1.2rem' }}>🗑️</button>
                                </div>
                            </div>
                        ))}

                        {/* Add Language Form */}
                        <div className="card-ui" style={{ padding: '25px', border: '1px solid #e2e8f0', borderRadius: '12px', background: 'white' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                                <div className="input-group">
                                    <label>Your Language</label>
                                    <input type="text" className="input-outline" value={newLanguage.language} onChange={(e) => setNewLanguage({ ...newLanguage, language: e.target.value })} />
                                </div>
                                <div className="input-group">
                                    <label>Level</label>
                                    <select className="input-outline" value={newLanguage.level} onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}>
                                        <option value="">Select...</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                        <option value="Fluent">Fluent</option>
                                        <option value="Native">Native</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-start' }}>
                                <button className="btn-primary" onClick={handleAddLanguage} style={{ background: '#000', color: '#fff', padding: '10px 20px', borderRadius: '5px' }}>Add Language</button>
                            </div>
                        </div>

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                        </div>
                    </div>
                );
            case 'Interests':
                return (
                    <div className="form-section">
                        <div className="section-header-small" style={{ marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.2rem', color: '#1e293b' }}>Interests</h3>
                            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Tell us what you love</p>
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '30px' }}>
                            {AVAILABLE_INTERESTS.map(interest => (
                                <button
                                    key={interest}
                                    onClick={() => toggleInterest(interest)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        border: formData.interests.includes(interest) ? '1px solid #4f46e5' : '1px solid #e2e8f0',
                                        background: formData.interests.includes(interest) ? '#e0e7ff' : 'white',
                                        color: formData.interests.includes(interest) ? '#4f46e5' : '#64748b',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        transition: 'all 0.2s',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}
                                >
                                    {interest} {formData.interests.includes(interest) ? '✓' : '+'}
                                </button>
                            ))}
                            {/* Display Custom Interests that are NOT in AVAILABLE_INTERESTS */}
                            {formData.interests.filter(i => !AVAILABLE_INTERESTS.includes(i)).map(interest => (
                                <button
                                    key={interest}
                                    onClick={() => toggleInterest(interest)}
                                    style={{
                                        padding: '8px 16px',
                                        borderRadius: '20px',
                                        border: '1px solid #4f46e5',
                                        background: '#e0e7ff',
                                        color: '#4f46e5',
                                        cursor: 'pointer',
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '5px'
                                    }}
                                >
                                    {interest} ✓
                                </button>
                            ))}
                        </div>

                        {/* Custom Interest Input */}
                        <div style={{ display: 'flex', gap: '10px', maxWidth: '400px', marginBottom: '30px' }}>
                            <input
                                type="text"
                                className="input-outline"
                                placeholder="Add other interest..."
                                value={customInterest}
                                onChange={(e) => setCustomInterest(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleAddCustomInterest()}
                            />
                            <button className="btn-secondary" onClick={handleAddCustomInterest} style={{ whiteSpace: 'nowrap' }}>+ Add</button>
                        </div>

                        <div style={{ textAlign: 'right', marginTop: '20px' }}>
                            <button className="btn-primary" onClick={handleSave} style={{ background: '#000', color: '#fff' }}>Save changes</button>
                        </div>
                    </div>
                );
            case 'Password Reset':
                return (
                    <div className="profile-form">
                        <div className="input-group">
                            <label>Current Password</label>
                            <input type="password" className="input-outline" placeholder="Enter current password" />
                        </div>
                        <div className="input-group">
                            <label>New Password</label>
                            <input type="password" className="input-outline" placeholder="Enter new password" />
                        </div>
                        <div className="input-group">
                            <label>Confirm New Password</label>
                            <input type="password" className="input-outline" placeholder="Confirm new password" />
                        </div>
                    </div>
                );
            default:
                return (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>
                        <h3>Coming Soon</h3>
                        <p>This section is under development.</p>
                    </div>
                );
        }
    };

    if (isEditing) {
        return (
            <div className="page-container" style={{ padding: '0', maxWidth: '100%' }}>
                <div className="profile-edit-container">
                    {/* Sidebar */}
                    <div className="profile-settings-sidebar">
                        <h3 onClick={() => setIsEditing(false)} style={{ cursor: 'pointer', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>←</span> Back
                        </h3>
                        {navItems.map((section, idx) => (
                            <div key={idx}>
                                <div className="settings-section-title">{section.section}</div>
                                {section.items.map(item => (
                                    <div
                                        key={item.id}
                                        className={`settings-nav-item ${activeSection === item.id ? 'active' : ''}`}
                                        onClick={() => setActiveSection(item.id)}
                                    >
                                        <span>{item.icon}</span>
                                        <span>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="profile-edit-content">
                        <div className="edit-content-header">
                            <h2>{activeSection}</h2>
                        </div>

                        {renderContent()}

                        <div className="form-actions">
                            <button className="btn-primary" onClick={handleSave}>Save Changes</button>
                            <button className="btn-secondary" onClick={() => { setIsEditing(false); setIsSidebarHidden(false); }}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Default View (Non-editing)
    return (
        <div className="page-container">
            <div className="profile-page-content">
                <div className="profile-pic-section" style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '15px' }}>
                    <div className="profile-pic-large" style={{
                        position: 'relative',
                        overflow: 'hidden',
                        backgroundImage: formData.profilePicture ? `url(${formData.profilePicture})` : 'none',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        marginBottom: 0
                    }}>
                        {!formData.profilePicture && (user?.name ? user.name.charAt(0).toUpperCase() : 'U')}
                    </div>
                </div>
                <h2 style={{ marginBottom: '10px' }}>{formData.name || 'User Name'}</h2>
                <p style={{ color: '#666', marginBottom: '30px', textAlign: 'center', maxWidth: '500px' }}>{formData.bio || 'No bio yet'}</p>

                <div className="profile-form">
                    <div className="input-group">
                        <label>Email:</label>
                        <div className="input-outline" style={{ background: '#f8fafc', border: 'none' }}>{formData.email}</div>
                    </div>

                    <div className="input-group">
                        <label>Role:</label>
                        <div className="input-outline" style={{ background: '#f8fafc', border: 'none', textTransform: 'capitalize' }}>{user?.role}</div>
                    </div>

                    <div className="input-group">
                        <label>Branch:</label>
                        <div className="input-outline" style={{ background: '#f8fafc', border: 'none' }}>{formData.branch || '-'}</div>
                    </div>

                    <div className="input-group">
                        <label>Year:</label>
                        <div className="input-outline" style={{ background: '#f8fafc', border: 'none' }}>{formData.year || '-'}</div>
                    </div>

                    <div className="input-group" style={{ gridColumn: '1 / -1' }}>
                        <label>Social Links:</label>
                        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                            {Object.entries(formData.socialLinks).map(([platform, link]) => (
                                link && (
                                    <a key={platform} href={link} target="_blank" rel="noopener noreferrer" style={{
                                        padding: '8px 16px', borderRadius: '20px', background: '#f1f5f9',
                                        color: '#334155', textDecoration: 'none', textTransform: 'capitalize', fontWeight: '500'
                                    }}>
                                        {platform}
                                    </a>
                                )
                            ))}
                        </div>
                    </div>
                    <button className="edit-btn" onClick={() => { setIsEditing(true); setIsSidebarHidden(true); }}>Edit Profile</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
