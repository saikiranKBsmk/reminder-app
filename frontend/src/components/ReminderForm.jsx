import React from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import { toast } from "react-toastify";

import { createReminder } from "../apis/methods";
import {
  layoutStyles,
  textStyles,
  buttonStyles,
} from "../commonStyles";

const ReminderForm = () => {
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [listening, setListening] = React.useState(false);

  const recognitionRef = React.useRef(null);

  const startListening = () => {
    if (loading) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      toast.error("Voice input not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";

    recognition.onstart = () => setListening(true);
    recognition.onresult = (e) =>
      setText(e.results[0][0].transcript);
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const handleSubmit = () => {
    if (!text.trim()) {
      toast.error("Please enter a reminder with time");
      return;
    }

    setLoading(true);

    const delay = new Promise((resolve) =>
      setTimeout(resolve, 1500)
    );

    Promise.all([
      createReminder({ raw_text: text, user_id: 1 }),
      delay,
    ])
      .then(([res]) => {
        toast.success(
          `Scheduled for ${new Date(
            res.scheduled_time
          ).toLocaleString()}`
        );
        setText("");
      })
      .catch(() => {
        toast.error("Failed to schedule reminder");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Box sx={layoutStyles.appRoot}>
      <Paper sx={layoutStyles.card}>
        {loading && (
          <Box sx={layoutStyles.loadingOverlay}>
            <CircularProgress size={32} />
          </Box>
        )}

        <Stack spacing={2.5} sx={{ opacity: loading ? 0.6 : 1 }}>
          <Typography sx={textStyles.title}>
            Smart Reminder
          </Typography>

          <Typography sx={textStyles.subtitle}>
            Type or speak your reminder
          </Typography>

          <TextField
            fullWidth
            focused
            placeholder="e.g. Remind me at 6 PM"
            value={text}
            disabled={loading}
            onChange={(e) => setText(e.target.value)}
            sx={layoutStyles.input}
          />

          <Box sx={layoutStyles.micContainer}>
            <Box
              sx={{
                ...layoutStyles.micPulse,
                animation:
                  listening && !loading
                    ? "pulse 1.5s infinite"
                    : "none",
              }}
            />
            <IconButton
              disabled={loading}
              onClick={listening ? stopListening : startListening}
              sx={layoutStyles.micButton}
            >
              {listening ? <StopIcon /> : <MicIcon />}
            </IconButton>
          </Box>

          <Button
            sx={buttonStyles.primaryButton}
            disabled={loading}
            onClick={handleSubmit}
          >
            Schedule Reminder
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ReminderForm;
