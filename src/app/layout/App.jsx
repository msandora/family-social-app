import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import { Route, useLocation } from 'react-router-dom';
import NavBar from '../../features/nav/NavBar';
import HomePage from '../../features/home/HomePage';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import ErrorComponent from '../common/errors/ErrorComponent';
import AccountPage from '../../features/auth/AccountPage';
import LoadingComponent from './LoadingComponent';
import ProfilePage from '../../features/profiles/profilePage/ProfilePage';
import PrivateRoute from './PrivateRoute';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import ScreamDashboard from '../../features/screams/screamDashboard/ScreamDashboard';
import ScreamDetailedPage from '../../features/screams/screamDetailed/ScreamDetailedPage';
import ScreamForm from '../../features/screams/screamForm/ScreamForm';
import UpdateScreamForm from '../../features/screams/screamForm/updateScreamForm';
import RecipeDashboard from '../../features/recipes/recipeDashboard/RecipeDashboard';
import RecipeDetailedPage from '../../features/recipes/recipeDetailed/RecipeDetailedPage';
import RecipeForm from '../../features/recipes/recipeForm/RecipeForm';
import FamilyDashboard from '../../features/family/FamilyDashboard/FamilyDashboard';
// import AddChildForm from '../../features/family/FamilyForms/AddChildForm';
// import AddSpouseForm from '../../features/family/FamilyForms/AddSpouseForm';

import PersonForm from '../../features/family/FamilyForms/PersonForm';

export default function App() {
  const { key } = useLocation();
  const { initialized } = useSelector((state) => state.async);

  if (!initialized) return <LoadingComponent content='Loading app...' />;

  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' hideProgressBar />
      <Route exact path='/' component={HomePage} />
      {/* Anything with forward slash plus anything else */}
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container className='main'>
              <Route exact path='/sandbox' component={Sandbox} />

              <Route exact path='/events' component={EventDashboard} />
              <Route path='/events/:id' component={EventDetailedPage} />
              <PrivateRoute
                path={['/createEvent', '/manageEvent/:id']}
                component={EventForm}
                key={`event_${key}`}
              />

              <Route exact path='/screams' component={ScreamDashboard} />
              <Route path='/screams/:id' component={ScreamDetailedPage} />
              <Route path='/createScream' component={ScreamForm} />
              <Route path='/manageScream/:id' component={UpdateScreamForm} />
              {/* <PrivateRoute
                path={['/createScream', '/manageScream/:id']}
                component={ScreamForm}
                key={`scream_${key}`}
              /> */}

              <Route exact path='/recipes' component={RecipeDashboard} />
              <Route path='/recipes/:id' component={RecipeDetailedPage} />
              <PrivateRoute
                path={['/createRecipe', '/manageRecipe/:id']}
                component={RecipeForm}
                key={`recipe_${key}`}
              />

              <Route exact path='/family-tree' component={FamilyDashboard} />
              <PrivateRoute
                path={['/updatePerson/:id']}
                component={PersonForm}
                key={`updatePerson_${key}`}
              />
              <PrivateRoute
                path={['/addChild/:id']}
                component={PersonForm}
                key={`addChild_${key}`}
              />
              <PrivateRoute
                path={['/addSpouse/:id']}
                component={PersonForm}
                key={`addSpouse_${key}`}
              />
              <PrivateRoute path='/account' component={AccountPage} />
              <PrivateRoute path='/profile/:id' component={ProfilePage} />
              <Route path='/error' component={ErrorComponent} />
            </Container>
          </>
        )}
      />
    </>
  );
}
