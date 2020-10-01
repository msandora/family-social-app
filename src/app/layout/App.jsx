import React from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'semantic-ui-react';
import { ToastContainer } from 'react-toastify';
import {
  Route,
  //  useLocation
} from 'react-router-dom';
import NavBar from '../../features/nav/NavBar';
import EventDashboard from '../../features/events/eventDashboard/EventDashboard';
import HomePage from '../../features/home/HomePage';
import EventDetailedPage from '../../features/events/eventDetailed/EventDetailedPage';
import EventForm from '../../features/events/eventForm/EventForm';
import Sandbox from '../../features/sandbox/Sandbox';
import ModalManager from '../common/modals/ModalManager';
import ErrorComponent from '../common/errors/ErrorComponent';
import FamilyTree from '../../features/family/FamilyTree/FamilyTree';
import AccountPage from '../../features/auth/AccountPage';
import LoadingComponent from './LoadingComponent';
import ProfilePage from '../../features/profiles/profilePage/ProfilePage';
import PrivateRoute from './PrivateRoute';
import ScreamDashboard from '../../features/screams/screamDashboard/ScreamDashboard';
import ScreamDetailedPage from '../../features/screams/screamDetailed/ScreamDetailedPage';
import ScreamForm from '../../features/screams/screamForm/ScreamForm';
import RecipeDashboard from '../../features/recipes/recipeDashboard/RecipeDashboard';
import RecipeDetailedPage from '../../features/recipes/recipeDetailed/RecipeDetailedPage';
import RecipeForm from '../../features/recipes/recipeForm/RecipeForm';

export default function App() {
  // const { key } = useLocation();
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
                exact
                path={['/createEvent', '/manageEvent/:id']}
                component={EventForm}
                // key={key}
              />
              <Route exact path='/screams' component={ScreamDashboard} />
              <Route path='/screams/:id' component={ScreamDetailedPage} />
              <PrivateRoute
                exact
                path={['/createScream', '/manageScream/:id']}
                component={ScreamForm}
                // key={key}
              />

              <Route exact path='/recipes' component={RecipeDashboard} />
              <Route path='/recipes/:id' component={RecipeDetailedPage} />
              <PrivateRoute
                exact
                path={['/createRecipe', '/manageRecipe/:id']}
                component={RecipeForm}
                // key={key}
              />

              <Route exact path='/family-tree' component={FamilyTree} />
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
