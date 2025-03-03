import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Select, MenuItem, Button, CircularProgress } from "@mui/material";

const API_BASE = "http://127.0.0.1:8000/api";

function App() {
  const [provinsi, setProvinsi] = useState([]);
  const [selectedProvinsi, setSelectedProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState([]);
  const [selectedKabupaten, setSelectedKabupaten] = useState("");
  const [jadwal, setJadwal] = useState(null);
  const [loading, setLoading] = useState(false);

  // Ambil daftar provinsi saat komponen pertama kali dimuat
  useEffect(() => {
    axios.get(`${API_BASE}/provinsi`).then((res) => {
      setProvinsi(res.data.data || []);
    });
  }, []);

  // Ambil daftar kabupaten berdasarkan provinsi yang dipilih
  const fetchKabupaten = () => {
    setKabupaten([]);
    setJadwal(null);
    if (!selectedProvinsi) return;
    axios
      .post(`${API_BASE}/kabkota`, { provinsi: selectedProvinsi })
      .then((res) => setKabupaten(res.data.data || []));
  };

  // Ambil jadwal imsakiyah berdasarkan provinsi dan kabupaten
  const fetchJadwal = () => {
    if (!selectedProvinsi || !selectedKabupaten) return;
    setLoading(true);
    axios
      .post(`${API_BASE}/jadwal`, { provinsi: selectedProvinsi, kabkota: selectedKabupaten })
      .then((res) => {
        setJadwal(res.data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Typography variant="h4">Jadwal Imsakiyah</Typography>

      <Select fullWidth value={selectedProvinsi} onChange={(e) => setSelectedProvinsi(e.target.value)} sx={{ mt: 2 }}>
        <MenuItem value="">Pilih Provinsi</MenuItem>
        {provinsi.map((prov) => (
          <MenuItem key={prov} value={prov}>{prov}</MenuItem>
        ))}
      </Select>

      <Button variant="contained" sx={{ mt: 2 }} onClick={fetchKabupaten}>
        Ambil Kabupaten/Kota
      </Button>

      {kabupaten.length > 0 && (
        <Select fullWidth value={selectedKabupaten} onChange={(e) => setSelectedKabupaten(e.target.value)} sx={{ mt: 2 }}>
          <MenuItem value="">Pilih Kabupaten/Kota</MenuItem>
          {kabupaten.map((kab) => (
            <MenuItem key={kab} value={kab}>{kab}</MenuItem>
          ))}
        </Select>
      )}

      {selectedKabupaten && (
        <Button variant="contained" sx={{ mt: 2 }} onClick={fetchJadwal}>
          Ambil Jadwal
        </Button>
      )}

      {loading && <CircularProgress sx={{ mt: 2 }} />}

      {jadwal && (
        <Container sx={{ mt: 4 }}>
          <Typography variant="h5">Jadwal {selectedKabupaten}</Typography>
          {Object.entries(jadwal).map(([key, value]) => (
            <Typography key={key}>{key}: {value}</Typography>
          ))}
        </Container>
      )}
    </Container>
  );
}

export default App;
