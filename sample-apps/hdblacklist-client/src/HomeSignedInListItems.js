import * as React from 'react';

import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import AnimationIcon from '@mui/icons-material/Animation';
import BiotechIcon from '@mui/icons-material/Biotech';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import CableIcon from '@mui/icons-material/Cable';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CastleIcon from '@mui/icons-material/Castle';
import CategoryIcon from '@mui/icons-material/Category';
import Collapse from '@mui/material/Collapse';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DeblurIcon from '@mui/icons-material/Deblur';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import FestivalIcon from '@mui/icons-material/Festival';
import FilterTiltShiftIcon from '@mui/icons-material/FilterTiltShift';
import HikingIcon from '@mui/icons-material/Hiking';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import InsightsIcon from '@mui/icons-material/Insights';
import InterestsIcon from '@mui/icons-material/Interests';
import LensIcon from '@mui/icons-material/Lens';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import LineStyleIcon from '@mui/icons-material/LineStyle';
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import LockIcon from '@mui/icons-material/Lock';
import NaturePeopleIcon from '@mui/icons-material/NaturePeople';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import NotesIcon from '@mui/icons-material/Notes';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PagesIcon from '@mui/icons-material/Pages';
import PentagonIcon from '@mui/icons-material/Pentagon';
import PeopleIcon from '@mui/icons-material/People';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import PolylineIcon from '@mui/icons-material/Polyline';
import PublicIcon from '@mui/icons-material/Public';
import RadioIcon from '@mui/icons-material/Radio';
import SchoolIcon from '@mui/icons-material/School';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import StyleIcon from '@mui/icons-material/Style';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import TempleBuddhistIcon from '@mui/icons-material/TempleBuddhist';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import TodayIcon from '@mui/icons-material/Today';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import WindowIcon from '@mui/icons-material/Window';

export default function HomeSignedInListItems() {
  const [isDayPlannerOpen, setIsDayPlannerOpen] = React.useState(false);
  const [isBodygraphsOpen, setIsBodygraphsOpen] = React.useState(false);
  const [isTheWorldOpen, setIsTheWorldOpen] = React.useState(false);
  const [isResearchCenterOpen, setIsResearchCenterOpen] = React.useState(false);
  const [isLearningCenterOpen, setIsLearningCenterOpen] = React.useState(false);
  const [isRaveMandalaOpen, setIsRaveMandalaOpen] = React.useState(false);
  const [isMysticCornerOpen, setIsMysticCornerOpen] = React.useState(false);
  const [isSpecialInterestOpen, setIsSpecialInterestOpen] = React.useState(false);

  const handleDayPlannerClick = () => {
    setIsDayPlannerOpen(!isDayPlannerOpen);
  };

  const handleBodygraphsClick = () => {
    setIsBodygraphsOpen(!isBodygraphsOpen);
  };

  const handleTheWorldClick = () => {
    setIsTheWorldOpen(!isTheWorldOpen);
  };

  const handleResearchCenterClick = () => {
    setIsResearchCenterOpen(!isResearchCenterOpen);
  };

  const handleLearningCenterClick = () => {
    setIsLearningCenterOpen(!isLearningCenterOpen);
  };

  const handleRaveMandalaClick = () => {
    setIsRaveMandalaOpen(!isRaveMandalaOpen);
  };

  const handleMysticCornerClick = () => {
    setIsMysticCornerOpen(!isMysticCornerOpen);
  };

  const handleSpecialInterestClick = () => {
    setIsSpecialInterestOpen(!isSpecialInterestOpen);
  };


 return (
    <div>
      <ListItemButton component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItem onClick={handleDayPlannerClick} button component={Link} to="/day-planner">
        <ListItemIcon>
          <TodayIcon />
        </ListItemIcon>
        <ListItemText primary="Day Planner" />
        {isDayPlannerOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isDayPlannerOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/day-planner/reminders" sx={{ pl: 4 }}>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText secondary="Reminders" />
          </ListItemButton>
          <ListItemButton component={Link} to="/day-planner/line-calendar" sx={{ pl: 4 }}>
            <ListItemIcon>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText secondary="Line Calendar" />
          </ListItemButton>
        </List>
      </Collapse>


      <ListItem onClick={handleBodygraphsClick} button component={Link} to="/bodygraphs">
        <ListItemIcon>
          <SelfImprovementIcon />
        </ListItemIcon>
        <ListItemText primary="Bodygraphs" />
        {isBodygraphsOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isBodygraphsOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/bodygraphs/new" sx={{ pl: 4 }}>
            <ListItemIcon>
              <AccessibilityNewIcon />
            </ListItemIcon>
            <ListItemText secondary="New Bodygraph" />
          </ListItemButton>

          <ListItemButton component={Link} to="/bodygraphs/all" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PermMediaIcon />
            </ListItemIcon>
            <ListItemText secondary="All Bodygraphs" />
          </ListItemButton>

          <ListItemButton component={Link} to="/bodygraphs/life-cycle-analysis" sx={{ pl: 4 }}>
            <ListItemIcon>
              <DonutLargeIcon />
            </ListItemIcon>
            <ListItemText secondary="Life Cycle Analysis" />
          </ListItemButton>

          <ListItemButton component={Link} to="/bodygraphs/profile-role-analysis" sx={{ pl: 4 }}>
            <ListItemIcon>
              <TheaterComedyIcon />
            </ListItemIcon>
            <ListItemText secondary="Profile Role Analysis" />
          </ListItemButton>


          <ListItemButton component={Link} to="/bodygraphs/partnership-analysis" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText secondary="Partnership Analysis" />
          </ListItemButton>

          <ListItemButton component={Link} to="/bodygraphs/penta-analysis" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PentagonIcon />
            </ListItemIcon>
            <ListItemText secondary="Penta Analysis" />
          </ListItemButton>

          <ListItemButton component={Link} to="/bodygraphs/lock-and-key-analysis" sx={{ pl: 4 }}>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText secondary="Lock and Key Analysis" />
          </ListItemButton>

          <ListItemButton component={Link} to="/bodygraphs/custom" sx={{ pl: 4 }}>
            <ListItemIcon>
              <ColorLensIcon />
            </ListItemIcon>
            <ListItemText secondary="Custom Bodygraph" />
          </ListItemButton>

        </List>
      </Collapse>



      <ListItem onClick={handleTheWorldClick} button component={Link} to="/the-world">
        <ListItemIcon>
          <PublicIcon />
        </ListItemIcon>
        <ListItemText primary="The World" />
        {isTheWorldOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isTheWorldOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/the-world/2027" sx={{ pl: 4 }}>
            <ListItemIcon>
              <NewspaperIcon />
            </ListItemIcon>
            <ListItemText secondary="2027" />
          </ListItemButton>
          <ListItemButton component={Link} to="/the-world/transit-forecast" sx={{ pl: 4 }}>
            <ListItemIcon>
              <InsightsIcon />
            </ListItemIcon>
            <ListItemText secondary="Transit Forecast" />
          </ListItemButton>
          <ListItemButton component={Link} to="/the-world/transit-theme-analysis" sx={{ pl: 4 }}>
            <ListItemIcon>
              <NotesIcon />
            </ListItemIcon>
            <ListItemText secondary="Transit Theme Analysis" />
          </ListItemButton>
        </List>
      </Collapse>



      <ListItem onClick={handleResearchCenterClick} button component={Link} to="/research-center">
        <ListItemIcon>
          <BiotechIcon />
        </ListItemIcon>
        <ListItemText primary="Research Center" />
        {isResearchCenterOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isResearchCenterOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/research-center/famous-people" sx={{ pl: 4 }}>
            <ListItemIcon>
              <EmojiEventsIcon />
            </ListItemIcon>
            <ListItemText secondary="Famous People" />
          </ListItemButton>
          <ListItemButton component={Link} to="/research-center/historical-figures" sx={{ pl: 4 }}>
            <ListItemIcon>
              <CastleIcon />
            </ListItemIcon>
            <ListItemText secondary="Historical Figures" />
          </ListItemButton>
          <ListItemButton component={Link} to="/research-center/historical-events" sx={{ pl: 4 }}>
            <ListItemIcon>
              <FestivalIcon />
            </ListItemIcon>
            <ListItemText secondary="Historical Events" />
          </ListItemButton>
          <ListItemButton component={Link} to="/research-center/global-cycles" sx={{ pl: 4 }}>
            <ListItemIcon>
              <AnimationIcon />
            </ListItemIcon>
            <ListItemText secondary="Global Cycles" />
          </ListItemButton>
        </List>
      </Collapse>



      <ListItem onClick={handleLearningCenterClick} button component={Link} to="/learning-center">
        <ListItemIcon>
          <SchoolIcon />
        </ListItemIcon>
        <ListItemText primary="Learning Center" />
        {isLearningCenterOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isLearningCenterOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/learning-center/audio-library" sx={{ pl: 4 }}>
            <ListItemIcon>
              <RadioIcon />
            </ListItemIcon>
            <ListItemText secondary="Audio Library" />
          </ListItemButton>
          <ListItemButton component={Link} to="/learning-center/video-library" sx={{ pl: 4 }}>
            <ListItemIcon>
              <VideoLibraryIcon />
            </ListItemIcon>
            <ListItemText secondary="Video Library" />
          </ListItemButton>
          <ListItemButton component={Link} to="/learning-center/books" sx={{ pl: 4 }}>
            <ListItemIcon>
              <LibraryBooksIcon />
            </ListItemIcon>
            <ListItemText secondary="Books" />
          </ListItemButton>
          <ListItemButton component={Link} to="/learning-center/rave-i-ching" sx={{ pl: 4 }}>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText secondary="Rave I'Ching" />
          </ListItemButton>
          <ListItemButton component={Link} to="/learning-center/classical-i-ching" sx={{ pl: 4 }}>
            <ListItemIcon>
              <LocalLibraryOutlinedIcon />
            </ListItemIcon>
            <ListItemText secondary="Classical I'Ching" />
          </ListItemButton>
          </List>
      </Collapse>

      <ListItem onClick={handleRaveMandalaClick} button component={Link} to="/rave-mandala">
      <ListItemIcon>
              <LensIcon />
            </ListItemIcon>
            <ListItemText primary="Rave Mandala" />
        {isRaveMandalaOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={isRaveMandalaOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/rave-mandala/rave-mandala-explorer" sx={{ pl: 4 }}>
            <ListItemIcon>
              <DeblurIcon />
            </ListItemIcon>
            <ListItemText secondary="Rave Mandala Explorer" />
          </ListItemButton>
          <ListItemButton component={Link} to="/rave-mandala/gate-sequence-analyzer" sx={{ pl: 4 }}>
            <ListItemIcon>
              <LineStyleIcon />
            </ListItemIcon>
            <ListItemText secondary="Sequence Analyzer" />
          </ListItemButton>
          <ListItemButton component={Link} to="/rave-mandala/quarters-and-godheads" sx={{ pl: 4 }}>
            <ListItemIcon>
              <FilterTiltShiftIcon />
            </ListItemIcon>
            <ListItemText secondary="Quarters &amp; Godheads" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItem onClick={handleMysticCornerClick} button component={Link} to="/mystic-corner">
        <ListItemIcon>
          <HistoryEduIcon />
        </ListItemIcon>
        <ListItemText primary="Mystic Corner" />
        {isMysticCornerOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isMysticCornerOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/mystic-corner/mystic-way-analyzer" sx={{ pl: 4 }}>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText secondary="Mystic Way Analyzer" />
          </ListItemButton>
          <ListItemButton component={Link} to="/mystic-corner/historical-mystics-and-religious-figures" sx={{ pl: 4 }}>
            <ListItemIcon>
              <TempleBuddhistIcon />
            </ListItemIcon>
            <ListItemText secondary="Historical Mystics" />
          </ListItemButton>
          <ListItemButton component={Link} to="/mystic-corner/incarnation-sequencing" sx={{ pl: 4 }}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText secondary="Incarnation Sequencing" />
          </ListItemButton>
          <ListItemButton component={Link} to="/mystic-corner/base-theory" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PagesIcon />
            </ListItemIcon>
            <ListItemText secondary="Base Theory" />
          </ListItemButton>
        </List>
      </Collapse>



      <ListItem onClick={handleSpecialInterestClick} button component={Link} to="/day-planner">
        <ListItemIcon>
          <InterestsIcon />
        </ListItemIcon>
        <ListItemText primary="Special Interest" />
        {isSpecialInterestOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={isSpecialInterestOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton component={Link} to="/special-interest/jungian-archetypes" sx={{ pl: 4 }}>
            <ListItemIcon>
              <NaturePeopleIcon />
            </ListItemIcon>
            <ListItemText secondary="Jungian Archetypes" />
          </ListItemButton>
          <ListItemButton component={Link} to="/special-interest/jungian-typology-and-myers-briggs" sx={{ pl: 4 }}>
            <ListItemIcon>
              <WindowIcon />
            </ListItemIcon>
            <ListItemText secondary="Jungian Typology" />
          </ListItemButton>
          <ListItemButton component={Link} to="/special-interest/enneagram" sx={{ pl: 4 }}>
            <ListItemIcon>
              <PolylineIcon />
            </ListItemIcon>
            <ListItemText secondary="Enneagram" />
          </ListItemButton>
          <ListItemButton component={Link} to="/special-interest/tarot" sx={{ pl: 4 }}>
            <ListItemIcon>
              <StyleIcon />
            </ListItemIcon>
            <ListItemText secondary="Tarot" />
          </ListItemButton>
          <ListItemButton component={Link} to="/special-interest/cards-of-destiny" sx={{ pl: 4 }}>
            <ListItemIcon>
              <StyleOutlinedIcon />
            </ListItemIcon>
            <ListItemText secondary="Cards of Destiny" />
          </ListItemButton>
        </List>
      </Collapse>














      {/* <ListItem button component={Link} to="/outer-planets">
        <ListItemIcon>
          <DeblurIcon />
        </ListItemIcon>
        <ListItemText primary="Outer Planets" />
      </ListItem> */}
    </div>
  );
}
