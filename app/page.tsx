"use client";

import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Box,
  Link,
  ThemeProvider,
  createTheme,
  CssBaseline,
  styled,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import GitHubIcon from "@mui/icons-material/GitHub";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import * as paillier from "paillier-bigint";

// カスタムテーマの作成
const theme = createTheme({
  palette: {
    primary: {
      main: "#6200EA",
    },
    secondary: {
      main: "#03DAC6",
    },
    background: {
      default: "#121212",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
        },
      },
    },
  },
});

// スタイル付きコンポーネントの作成
const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(45deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
  padding: theme.spacing(2),
}));

const AnimatedCard = styled(Card)(({}) => ({
  transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  "&:hover": {
    transform: "translateY(-5px)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
  },
}));

// Paillier暗号の公開鍵と秘密鍵の生成
const generateKeys = async () => {
  const { publicKey, privateKey } = await paillier.generateRandomKeys(2048);
  return { publicKey, privateKey };
};

// 暗号化の実装
const encryptNumber = (value: number, publicKey: any) => {
  return publicKey.encrypt(BigInt(value));
};

// 復号化の実装
const decryptNumber = (encrypted: bigint, privateKey: any) => {
  return privateKey.decrypt(encrypted).toString();
};

// ホモモルフィック加算の実装
const homomorphicAddition = (enc1: bigint, enc2: bigint, publicKey: any) => {
  return publicKey.addition(enc1, enc2);
};

export default function HomomorphicEncryptionDemo() {
  const [publicKey, setPublicKey] = useState<any>(null);
  const [privateKey, setPrivateKey] = useState<any>(null);
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [encryptedNumber1, setEncryptedNumber1] = useState<bigint | null>(null);
  const [encryptedNumber2, setEncryptedNumber2] = useState<bigint | null>(null);
  const [encryptedSum, setEncryptedSum] = useState<bigint | null>(null);
  const [decryptedSum, setDecryptedSum] = useState("");

  // 初回レンダー時に鍵を生成
  useEffect(() => {
    generateKeys().then(({ publicKey, privateKey }) => {
      console.log({ publicKey });
      setPublicKey(publicKey);
      setPrivateKey(privateKey);
    });
  }, []);

  const handleEncrypt = async () => {
    if (!publicKey || !privateKey) return;

    const enc1 = encryptNumber(number1, publicKey);
    const enc2 = encryptNumber(number2, publicKey);
    setEncryptedNumber1(enc1);
    setEncryptedNumber2(enc2);

    const encSum = homomorphicAddition(enc1, enc2, publicKey);
    setEncryptedSum(encSum);

    const decSum = decryptNumber(encSum, privateKey);
    setDecryptedSum(decSum);
  };

  // 鍵がまだ生成されていない場合の対処
  if (!publicKey || !privateKey) {
    return <div>Loading...</div>; // 鍵が生成されるまでロード状態を表示
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GradientBackground>
        <AnimatedCard sx={{ maxWidth: 600, width: "100%" }}>
          <CardContent>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              align="center"
              color="primary"
            >
              Homomorphic Encryption Demo
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Number 1"
                  type="number"
                  value={number1}
                  onChange={(e) => setNumber1(parseInt(e.target.value, 10))}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Number 2"
                  type="number"
                  value={number2}
                  onChange={(e) => setNumber2(parseInt(e.target.value, 10))}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={handleEncrypt}
              startIcon={<LockIcon />}
              sx={{ mt: 3, mb: 2 }}
            >
              Encrypt and Calculate
            </Button>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="Encrypted Number 1"
                  value={encryptedNumber1?.toString() || ""}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                    startAdornment: <LockIcon color="primary" />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Encrypted Number 2"
                  value={encryptedNumber2?.toString() || ""}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                    startAdornment: <LockIcon color="primary" />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Encrypted Sum"
                  value={encryptedSum?.toString() || ""}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                    startAdornment: <LockIcon color="primary" />,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Decrypted Sum"
                  value={decryptedSum}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                    startAdornment: <LockOpenIcon color="secondary" />,
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions
            sx={{ justifyContent: "center", flexDirection: "column", pb: 2 }}
          >
            <Typography variant="body2" color="textSecondary" align="center">
              Homomorphic encryption allows computations on encrypted data.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
              <Link
                href="https://medium.com/privacy-preserving-natural-language-processing/homomorphic-encryption-for-beginners-a-practical-guide-part-1-b8f26d03a98a"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "secondary.main",
                }}
              >
                <OpenInNewIcon sx={{ mr: 0.5 }} fontSize="small" />
                Learn more
              </Link>
              <Link
                href="https://github.com/dan01240/homomorphic-encryption-demo"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "secondary.main",
                }}
              >
                <GitHubIcon sx={{ mr: 0.5 }} fontSize="small" />
                GitHub Projects
              </Link>
            </Box>
          </CardActions>
        </AnimatedCard>
      </GradientBackground>
    </ThemeProvider>
  );
}
