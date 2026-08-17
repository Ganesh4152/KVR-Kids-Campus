import Navbar from "../components/Navbar";
import AcademicsNav from "../components/AcademicsNav";
import AcademicsHero from "../components/AcademicsHero";
import Curriculum from "../components/Curriculum";
import ClassesOffered from "../components/ClassesOffered";
import TeachingMethodology from "../components/TeachingMethodology";

function Academics() {
  return (
    <>
      <Navbar />
      <AcademicsNav />

      <AcademicsHero />
      <Curriculum />
      <ClassesOffered />
      <TeachingMethodology />
    </>
  );
}

export default Academics;
