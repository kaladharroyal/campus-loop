import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/pages.css';
import { useAuth } from '../context/AuthContext';
import { useLayout } from '../context/LayoutContext';
import ProfileAbout from './Student/ProfileAbout';
import ProfileContact from './Student/ProfileContact';
import ProfileEducation from './Student/ProfileEducation';
import ProfileOtherEducation from './Student/ProfileOtherEducation';
import ProfileExternal from './Student/ProfileExternal';
import ProfileResume from './Student/ProfileResume';
import ProfileSkills from './Student/ProfileSkills';
import ProfileWork from './Student/ProfileWork';
import ProfileProjects from './Student/ProfileProjects';
import ProfileMentoring from './Student/ProfileMentoring';
import ProfileAdditional from './Student/ProfileAdditional';
import ProfileAchievements from './Student/ProfileAchievements';
import ProfileCompetitions from './Student/ProfileCompetitions';
import ProfileEvents from './Student/ProfileEvents';
import ProfileCertifications from './Student/ProfileCertifications';
import ProfilePublications from './Student/ProfilePublications';
import ProfilePatents from './Student/ProfilePatents';
import ProfileLanguages from './Student/ProfileLanguages';
import ProfileInterests from './Student/ProfileInterests';
import ProfilePassword from './Student/ProfilePassword';

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
        patents: [],
        hasNoPatents: false,
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
    const [newPatent, setNewPatent] = useState({
        title: '',
        office: '',
        applicationNo: '',
        status: 'Issued',
        issueDate: '',
        patentUrl: '',
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

    const handleAddPatent = () => {
        if (newPatent.title && newPatent.office && newPatent.issueDate) {
            setFormData({
                ...formData,
                patents: [...formData.patents, newPatent]
            });
            setNewPatent({
                title: '',
                office: '',
                applicationNo: '',
                status: 'Issued',
                issueDate: '',
                patentUrl: '',
                description: ''
            });
        } else {
            alert('Please fill in required fields (Title, Office/Authority, Issue Date)');
        }
    };

    const handleRemovePatent = (index) => {
        const updatedPatents = formData.patents.filter((_, i) => i !== index);
        setFormData({ ...formData, patents: updatedPatents });
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
                { id: 'Other Education', icon: '📄', label: 'Other Education' },
                { id: 'External Profiles', icon: '🔗', label: 'External Profiles' },
                { id: 'Resume', icon: '📄', label: 'Resume' },
                { id: 'Additional Questions', icon: '📄', label: 'Additional Questions' },
                { id: 'Skills', icon: '</>', label: 'Skills' },
                { id: 'Work', icon: '💼', label: 'Work' },
                { id: 'Projects', icon: '📂', label: 'Projects' },
                { id: 'Mentoring', icon: '👨‍🏫', label: 'Mentoring' },
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
                return <ProfileAbout formData={formData} handleChange={handleChange} handleFileChange={handleFileChange} />;
            case 'Contact Details':
                return <ProfileContact
                    formData={formData}
                    handleChange={handleChange}
                    handleParentChange={handleParentChange}
                    handleSameAddressChange={handleSameAddressChange}
                    handleSocialChange={handleSocialChange}
                />;
            case 'Current Education':
                return <ProfileEducation
                    formData={formData}
                    handleEducationChange={handleEducationChange}
                    handleScoreChange={handleScoreChange}
                />;
            case 'Other Education':
                return <ProfileOtherEducation
                    formData={formData}
                    handlePreviousEducationChange={handlePreviousEducationChange}
                />;
            case 'External Profiles':
                return <ProfileExternal
                    formData={formData}
                    handleSocialChange={handleSocialChange}
                />;
            case 'Resume':
                return <ProfileResume
                    formData={formData}
                    handleChange={handleChange}
                />;
            case 'Skills':
                return <ProfileSkills
                    formData={formData}
                    newSkill={newSkill}
                    setNewSkill={setNewSkill}
                    handleAddSkill={handleAddSkill}
                    handleRemoveSkill={handleRemoveSkill}
                />;
            case 'Work':
                return <ProfileWork
                    formData={formData}
                    newWork={newWork}
                    setNewWork={setNewWork}
                    handleAddWork={handleAddWork}
                    handleRemoveWork={handleRemoveWork}
                />;
            case 'Projects':
                return <ProfileProjects
                    formData={formData}
                    newProject={newProject}
                    setNewProject={setNewProject}
                    handleAddProject={handleAddProject}
                    handleRemoveProject={handleRemoveProject}
                />;
            case 'Mentoring':
                return <ProfileMentoring
                    formData={formData}
                    handleChange={handleChange}
                />;
            case 'Achievements':
                return <ProfileAchievements
                    formData={formData}
                    newAchievement={newAchievement}
                    setNewAchievement={setNewAchievement}
                    handleAddAchievement={handleAddAchievement}
                    handleRemoveAchievement={handleRemoveAchievement}
                />;
            case 'Competitions':
                return <ProfileCompetitions
                    formData={formData}
                    newCompetition={newCompetition}
                    setNewCompetition={setNewCompetition}
                    handleAddCompetition={handleAddCompetition}
                    handleRemoveCompetition={handleRemoveCompetition}
                />;
            case 'Events':
                return <ProfileEvents
                    formData={formData}
                    newEvent={newEvent}
                    setNewEvent={setNewEvent}
                    handleAddEvent={handleAddEvent}
                    handleRemoveEvent={handleRemoveEvent}
                />;
            case 'Certifications':
                return <ProfileCertifications
                    formData={formData}
                    newCertification={newCertification}
                    setNewCertification={setNewCertification}
                    handleAddCertification={handleAddCertification}
                    handleRemoveCertification={handleRemoveCertification}
                />;
            case 'Publications':
                return <ProfilePublications
                    formData={formData}
                    newPublication={newPublication}
                    setNewPublication={setNewPublication}
                    handleAddPublication={handleAddPublication}
                    handleRemovePublication={handleRemovePublication}
                />;
            case 'Patents':
                return <ProfilePatents
                    formData={formData}
                    newPatent={newPatent}
                    setNewPatent={setNewPatent}
                    handleAddPatent={handleAddPatent}
                    handleRemovePatent={handleRemovePatent}
                />;
            case 'Languages':
                return <ProfileLanguages
                    formData={formData}
                    newLanguage={newLanguage}
                    setNewLanguage={setNewLanguage}
                    handleAddLanguage={handleAddLanguage}
                    handleRemoveLanguage={handleRemoveLanguage}
                />;
            case 'Interests':
                return <ProfileInterests
                    formData={formData}
                    toggleInterest={toggleInterest}
                    customInterest={customInterest}
                    setCustomInterest={setCustomInterest}
                    handleAddCustomInterest={handleAddCustomInterest}
                />;
            case 'Password Reset':
                return <ProfilePassword />;
            case 'Additional Questions':
                return <ProfileAdditional />;
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
