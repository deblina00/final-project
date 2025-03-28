import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Stack,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from "@mui/material";
// import "react-toastify/dist/ReactToastify.css";
import { createProps } from "@/typescript/cms.interface";
import { createMutation } from "@/customHooks/query/cms.query.hooks";
import toast, { Toaster } from "react-hot-toast";

const CreateProduct: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createProps>();
  const { mutate, isPending } = createMutation();
  const [image, setImage] = useState<File | null>(null);

  const onSubmit = async (formData: createProps) => {
    const { name, price, description, category } = formData;
    mutate(
      { name, price, category, description, token: "", message: "", status: 0 },
      {
        onSuccess: () => {
          reset();
          toast.success("Product created successfully");
        },
      }
    );
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0D0D0D, #1A1A2E, #FF6600, #0099CC)",
          backgroundSize: "400% 400%",
          animation: "gradientBG 10s ease infinite",
        }}
      >
        <Paper
          elevation={10}
          style={{
            padding: 30,
            width: 380,
            borderRadius: 15,
            background: "#fff",
            // background:"transparent",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.8)",
          }}
        >
          <Box textAlign="center">
            <Typography
              variant="h5"
              align="center"
              gutterBottom
              style={{ marginBottom: 3, color: "#123C69", fontWeight: "bold" }}
            >
              Create Product
            </Typography>
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              {...register("name", { required: "Name is required" })}
              label="Name"
              placeholder="Enter product name"
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              {...register("price", {
                required: "Price is required",
                valueAsNumber: true,
              })}
              label="Price"
              placeholder="Enter product price"
              fullWidth
              margin="normal"
              type="number"
              error={!!errors.price}
              helperText={errors.price?.message}
            />
            <TextField
              {...register("category", {
                required: "Category is required",
              })}
              label="Category"
              placeholder="Enter product category"
              fullWidth
              margin="normal"
              error={!!errors.category}
              helperText={errors.category?.message}
            />
            <TextField
              {...register("description", {
                required: "Description is required",
              })}
              label="Description"
              placeholder="Enter product description"
              fullWidth
              margin="normal"
              multiline
              rows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <Button
              variant="contained"
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                pt:1.5,
                fontSize: 18,
                background: "#123C69",
                "&:hover": { background: "#008ba3" },
              }}
              disabled={isPending}
            >
              <b>{isPending ? "Creating..." : "Create Product"}</b>
            </Button>
          </form>
        </Paper>
      </Grid>
    </>
  );
};

export default CreateProduct;
