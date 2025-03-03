import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import "./App.css";
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
      .post(`${API_BASE}/jadwal`, {
        provinsi: selectedProvinsi,
        kabkota: selectedKabupaten,
      })
      .then((res) => {
        setJadwal(res.data.data[0]?.imsakiyah || []); // Mengambil jadwal dari imsakiyah
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return (
    <Container className="container">
      {/* Judul otomatis */}
      <Typography variant="h4" sx={{ mb: 3 }}>
        Jadwal Imsakiyah 2025 (1446 Hijriah){" "}
        {selectedKabupaten ? `- ${selectedKabupaten}` : ""}
      </Typography>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Provinsi: {selectedProvinsi || "Pilih Provinsi"} - Kota/Kabupaten:{" "}
        {selectedKabupaten || "Pilih Kabupaten/Kota"}
      </Typography>
      <Typography variant="body1" sx={{ mb: 3 }}>
        Berikut ini adalah Jadwal Imsakiyah 2025 (1446 Hijriah). Sumber dari
        data pada API ini adalah Bimas Islam Kemenag RI.
      </Typography>

      {/* Dropdown Pilih Provinsi */}
      <Select
        fullWidth
        value={selectedProvinsi}
        onChange={(e) => setSelectedProvinsi(e.target.value)}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Pilih Provinsi
        </MenuItem>
        {provinsi.map((prov) => (
          <MenuItem key={prov} value={prov}>
            {prov}
          </MenuItem>
        ))}
      </Select>

      {/* Tombol Ambil Kabupaten/Kota */}
      <Button
        variant="contained"
        onClick={fetchKabupaten}
        fullWidth
        disabled={!selectedProvinsi}
        sx={{ mt: 2 }}
      >
        Ambil Kabupaten/Kota
      </Button>

      {/* Dropdown Pilih Kabupaten/Kota */}
      {kabupaten.length > 0 && (
        <Select
          fullWidth
          value={selectedKabupaten}
          onChange={(e) => setSelectedKabupaten(e.target.value)}
          displayEmpty
          sx={{ mt: 2 }}
        >
          <MenuItem value="" disabled>
            Pilih Kabupaten/Kota
          </MenuItem>
          {kabupaten.map((kab) => (
            <MenuItem key={kab} value={kab}>
              {kab}
            </MenuItem>
          ))}
        </Select>
      )}

      {/* Tombol Ambil Jadwal */}
      {selectedKabupaten && (
        <Button
          variant="contained"
          onClick={fetchJadwal}
          fullWidth
          sx={{ mt: 2 }}
        >
          Ambil Jadwal
        </Button>
      )}

      {/* Loading Indicator */}
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Menampilkan Jadwal Imsakiyah */}
      {jadwal && (
        <Box className="jadwal-container" sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            Jadwal Imsakiyah - {selectedKabupaten}
          </Typography>

          <Box sx={{ overflowX: "auto", borderRadius: "8px", boxShadow: 2 }}>
            <table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Tanggal</th>
                  <th>Imsak</th>
                  <th>Subuh</th>
                  <th>Dzuhur</th>
                  <th>Ashar</th>
                  <th>Maghrib</th>
                  <th>Isya</th>
                </tr>
              </thead>
              <tbody>
                {jadwal.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.tanggal} Ramadhan</td>
                    <td>{item.imsak}</td>
                    <td>{item.subuh}</td>
                    <td>{item.dzuhur}</td>
                    <td>{item.ashar}</td>
                    <td>{item.maghrib}</td>
                    <td>{item.isya}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Box>
      )}
    </Container>
  );
}

export default App;
