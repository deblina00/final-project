import {
  Typography,
  CircularProgress,
  Paper,
  Button,
  Box,
  Modal,
} from "@mui/material";
import { motion } from "framer-motion";
import { fetchProductQuery } from "@/customHooks/query/cms.query.hooks";
import { detailmodalProps } from "@/typescript/cms.interface";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  background: "#F6F0ED",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const ProductDetails: React.FC<detailmodalProps & { id: string | number }> = ({
  isOpen,
  onClose,
  id,
}) => {
  const { data: product, isLoading, isError } = fetchProductQuery(id as string);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="product-details-title"
    >
      <Box sx={modalStyle}>
        <Typography
          id="product-details-title"
          variant="h4"
          component="h2"
          mb={2}
          align="center"
          sx={{ color: "#123C69", fontWeight: "bold", fontSize: "25px" }}
        >
          Product Details
        </Typography>
        <Box>
          {isLoading && (
            <Box
              display="flex"
              justifyContent="center"
              my={3}
              textAlign="center"
            >
              <CircularProgress />
            </Box>
          )}

          {isError && (
            <Typography color="error" textAlign="center">
              Failed to load product details. Please try again.
            </Typography>
          )}

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Typography variant="h5" fontWeight="bold">
                {product?.image}
              </Typography>
              <Typography variant="h5" fontWeight="bold">
                {product?.name}
              </Typography>
              <Typography variant="body1" mt={1}>
                Description: {product?.description}
              </Typography>
              <Typography variant="h6" mt={1}>
                Category: {product?.category}
              </Typography>
              <Typography variant="h5" fontWeight="bold" mt={2}>
                ${product?.price}
              </Typography>
            </motion.div>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" mt={3}>
          <Button
            variant="contained"
            color="primary"
            sx={{ bgcolor: "#123C69", "&:hover": { background: "#008ba3" } }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default ProductDetails;
