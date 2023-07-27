import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, Grid, Box } from '@mui/material';
import { adminApi } from '../api/admin';
import withAuthCheck from './withAuthCheck'; 

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({});
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventImage, setEventImage] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [tags, setTags] = useState('');
    const [newsletterTitle, setNewsletterTitle] = useState('');
    const [newsletterContent, setNewsletterContent] = useState('');
    const [newsletters, setNewsletters] = useState([]);

    useEffect(() => {
        adminApi.getDashboardData()
            .then(response => {
                setDashboardData(response.data);
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
            });

        adminApi.getNewsletters()
            .then(response => {
                setNewsletters(response.data);
            })
            .catch(error => {
                console.error('Error fetching newsletters:', error);
                setNewsletters([]);
            });
    }, []);

    const handleCreateEvent = (e) => {
        e.preventDefault();

        const newEvent = {
            eventName,
            date: eventDate,
            eventImage,
            eventDetails,
            tags: tags.split(',').map(tag => tag.trim()),
        };

        adminApi.createEvent(newEvent)
            .then(response => {
                console.log('Event created:', response.data);
                alert('Event created successfully!');
                setEventName('');
                setEventDate('');
                setEventImage('');
                setEventDetails('');
                setTags('');
            })
            .catch(error => {
                console.error('Error creating event:', error);
            });
    };

    const handleCreateNewsletter = (e) => {
        e.preventDefault();

        const newNewsletter = {
            title: newsletterTitle,
            content: newsletterContent,
        };

        adminApi.createNewsletter(newNewsletter)
            .then(response => {
                console.log('Newsletter created:', response.data);
                alert('Newsletter created successfully!');
                setNewsletterTitle('');
                setNewsletterContent('');
            })
            .catch(error => {
                console.error('Error creating newsletter:', error);
            });
    };

return (
        <Container>
            <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
            <Typography variant="h6">Event Count: {dashboardData.eventCount}</Typography>
            <Typography variant="h6">Subscriber Count: {dashboardData.subscriberCount}</Typography>
            <Typography variant="h6">User Count: {dashboardData.userCount}</Typography>

            <Box mt={4}>
                <Typography variant="h5" gutterBottom>Create Event</Typography>
                <form onSubmit={handleCreateEvent}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Event Name"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Event Date"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Event Image"
                                value={eventImage}
                                onChange={(e) => setEventImage(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Event Details"
                                value={eventDetails}
                                onChange={(e) => setEventDetails(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Tags"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>Create Event</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>

            <Box mt={4}>
                <Typography variant="h5" gutterBottom>Create Newsletter</Typography>
                <form onSubmit={handleCreateNewsletter}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Newsletter Title"
                                value={newsletterTitle}
                                onChange={(e) => setNewsletterTitle(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Newsletter Content"
                                value={newsletterContent}
                                onChange={(e) => setNewsletterContent(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" fullWidth>Create Newsletter</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>

            {newsletters.length > 0 && (
                <Box mt={4}>
                    <Typography variant="h5" gutterBottom>Newsletters</Typography>
                    {newsletters.map(newsletter => (
                        <Grid container key={newsletter._id}>
                            <Grid item xs={8}>
                                <Typography variant="h6">{newsletter.title}</Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Box>
            )}
        </Container>
    );
};

export default withAuthCheck(AdminDashboard);
