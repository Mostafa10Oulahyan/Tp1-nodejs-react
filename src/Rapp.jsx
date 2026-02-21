import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://tp1-nodejs-rest-api.vercel.app/"; // <-- remplace

export default function Rapp() {
  const [n1, setN1] = useState("");
  const [n2, setN2] = useState("");
  const [mode, setMode] = useState("somme");

  const [trigger, setTrigger] = useState(false); // déclencheur
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  //  Appel API uniquement quand trigger change
  useEffect(() => {
    if (!trigger) return;

    setLoading(true);
    setError("");
    setResult("");

    axios
      .post(`${API_BASE}/api/v1/calculs/${mode}`, { n1, n2 })
      .then((res) => {
        if (res.data.status === "success") {
          setResult(res.data.result);
        } else {
          setError(res.data.message || "Erreur inconnue");
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
        setError(
          err.response?.data?.message ||
          err.message ||
          "Erreur lors du calcul"
        );
      })
      .finally(() => {
        setLoading(false);
        setTrigger(false); // reset
      });
  }, [trigger]);

  const handleCalculate = () => {
    if (!n1 || !n2) {
      setError("Veuillez saisir les deux nombres");
      return;
    }
    setTrigger(true);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Rapi Calculator</h2>

        <div style={styles.switch}>
          <button
            onClick={() => setMode("somme")}
            style={{
              ...styles.switchBtn,
              background: mode === "somme" ? "#6366f1" : "#1f2937"
            }}
          >
            Somme
          </button>
          <button
            onClick={() => setMode("produit")}
            style={{
              ...styles.switchBtn,
              background: mode === "produit" ? "#10b981" : "#1f2937"
            }}
          >
            Produit
          </button>
        </div>

        <div style={styles.inputs}>
          <input
            type="number"
            placeholder="Nombre 1"
            value={n1}
            onChange={(e) => setN1(e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Nombre 2"
            value={n2}
            onChange={(e) => setN2(e.target.value)}
            style={styles.input}
          />
        </div>

        <button onClick={handleCalculate} style={styles.button}>
          Calculer
        </button>

        {loading && <p style={{ color: "#ccc" }}>Calcul en cours...</p>}
        {result && <p style={{ color: "#10b981" }}>{result}</p>}
        {error && <p style={{ color: "#ef4444" }}>{error}</p>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #111827, #1f2937)",
    color: "white"
  },
  card: {
    background: "#111827",
    padding: 30,
    borderRadius: 16,
    width: 350,
    boxShadow: "0 15px 40px rgba(0,0,0,0.4)"
  },
  title: {
    textAlign: "center",
    marginBottom: 20
  },
  switch: {
    display: "flex",
    gap: 10,
    marginBottom: 20
  },
  switchBtn: {
    flex: 1,
    padding: 10,
    border: "none",
    borderRadius: 8,
    color: "white",
    cursor: "pointer"
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 20
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #374151",
    background: "#1f2937",
    color: "white"
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 8,
    border: "none",
    background: "#6366f1",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  }
};