export const layoutStyles = {
  appRoot: {
    minHeight: "100vh",
    backgroundColor: "#0b0f14",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },

  card: {
    position: "relative",
    width: "100%",
    maxWidth: "380px",
    padding: "24px",
    borderRadius: "16px",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    isolation: "isolate",
    boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
  },

  loadingOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(255,255,255,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },

  input: {
    "& .MuiOutlinedInput-root": {
      height: "44px",
      borderRadius: "999px",
      backgroundColor: "#ffffff",
    },
    "& fieldset": {
      borderColor: "#e5e7eb",
    },
  },

  micContainer: {
    display: "flex",
    justifyContent: "center",
    position: "relative",
    marginTop: "10px",
    marginBottom: "6px",
  },

  micButton: {
    width: "44px",
    height: "44px",
    backgroundColor: "#111827",
    color: "#ffffff",
    zIndex: 2,
    "&:hover": {
      backgroundColor: "#111827",
    },
  },

  micPulse: {
    position: "absolute",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "rgba(17,24,39,0.15)",
    zIndex: 1,
  },
};

export const textStyles = {
  title: {
    fontSize: "18px",
    fontWeight: 600,
    color: "#111827",
    textAlign: "center",
  },

  subtitle: {
    fontSize: "13px",
    color: "#6b7280",
    textAlign: "center",
  },
};

export const buttonStyles = {
  primaryButton: {
    height: "44px",
    borderRadius: "999px",
    backgroundColor: "#2563eb",
    fontWeight: 600,
    fontSize: "14px",
    textTransform: "none",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#030f2c", 
    },
  },
};

