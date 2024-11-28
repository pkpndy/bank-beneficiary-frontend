import { Route, Routes } from 'react-router-dom';
import './App.css';
import { BeneficiaryList } from './components/BeneficiaryList';
import { AddBeneficiary } from './components/AddBeneficiary';

function App() {
  return (
      <Routes>
        <Route path="/" element={<BeneficiaryList />} />
        <Route path="/add" element={<AddBeneficiary />} />
      </Routes>
  );
}

export default App;
