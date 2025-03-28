import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  Grid,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "next/router";
import { motion } from "framer-motion";
import SweetAlertComponent from "@/ui/sweetalert";
import {
  allProductsQuery,
  deleteMutation,
  updateMutation,
} from "@/customHooks/query/cms.query.hooks";
import { Product } from "@/typescript/cms.interface";
import toast, { Toaster } from "react-hot-toast";
import ProductDetails from "../details/[id]";

export default function List() {
  const [isTableView, setIsTableView] = useState(false);
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = allProductsQuery();
  const { mutate: deleteMutate } = deleteMutation();
  const [productId, setProductId] = useState<string | number | null>(null);
  const { mutate: updateMutate, isPending: isUpdating } = updateMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  // const router = useRouter();
  const products = data?.products || [];

  const toggleView = () => setIsTableView((prev) => !prev);

  const handleDelete = () => {
    if (deleteId) {
      deleteMutate(deleteId, {
        onSuccess: () => {
          setModal(false);
          queryClient.invalidateQueries({ queryKey: ["LISTPRODUCTS"] });
          toast.success("Product deleted successfully!");
        },
        onError: () => toast.error("Failed to delete product."),
      });
    }
  };

  const handleOpenModal = (id: string | number) => {
    setProductId(id);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProductId(null);
  };

  const handleUpdate = () => {
    if (!editProduct) return;
    updateMutate(editProduct, {
      onSuccess: () => {
        setEditProduct(null);
        queryClient.invalidateQueries({ queryKey: ["LISTPRODUCTS"] });
        toast.success("Product updated successfully!");
      },
      onError: () => toast.error("Failed to update product."),
    });
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Box
        sx={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0D0D0D, #1A1A2E, #FF6600, #0099CC)",
          backgroundSize: "400% 400%",
          animation: "gradientBG 10s ease infinite",
          padding: 4,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          fontWeight="bold"
          sx={{ color: "#fff" }}
        >
          Product List
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <Switch
            style={{ color: "#fff" }}
            checked={isTableView}
            onChange={toggleView}
          />
        </Box>

        <Box sx={{ maxWidth: "1300px", margin: "0 auto", padding: "0 16px" }}>
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
            >
              <CircularProgress />
            </Box>
          ) : isError ? (
            <Typography align="center" variant="h6" color="error">
              Failed to load products.
            </Typography>
          ) : products.length > 0 ? (
            isTableView ? (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product._id}>
                        <TableCell>
                          <img
                            src={product.image || "/p.jpeg"}
                            alt={product.name}
                            width={50}
                          />
                        </TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell>{product.category}</TableCell>
                        <TableCell>${product.price}</TableCell>
                        <TableCell>
                          <IconButton
                            color="error"
                            onClick={() => {
                              setDeleteId(product._id);
                              setModal(true);
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => setEditProduct(product)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenModal(product._id)}
                          >
                            <VisibilityIcon />
                          </IconButton>
                          {/* <IconButton
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenModal(product._id)}
                          >
                           <VisibilityIcon/> 
                          </IconButton> */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Grid container spacing={4}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Card
                        sx={{
                          background: "#ffffff",
                          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                          borderRadius: 3,
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="100"
                          image={product.image || "/p.jpeg"}
                          alt={product.name}
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h6"
                            align="center"
                            fontWeight="bold"
                          >
                            {product.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                          >
                            ${product.price}
                          </Typography>
                        </CardContent>
                        <Box
                          display="flex"
                          justifyContent="center"
                          gap={2}
                          p={2}
                        >
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              setDeleteId(product._id);
                              setModal(true);
                            }}
                          >
                            Remove
                          </Button>
                          <Button
                            color="primary"
                            variant="outlined"
                            sx={{
                              color: "#123C69",
                              borderColor: "#123C69",
                              fontWeight: "bold",
                            }}
                            onClick={() => setEditProduct(product)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleOpenModal(product._id)}
                            sx={{ bgcolor: "#123C69" }}
                          >
                            Details
                          </Button>
                        </Box>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            )
          ) : (
            <Typography align="center" width="100%">
              No products found.
            </Typography>
          )}

          {modal && (
            <SweetAlertComponent
              confirm={handleDelete}
              cancle={() => setModal(false)}
              title="Are You Sure?"
              subtitle="You will not be able to recover this product"
              type="warning"
              confirmBtnText="Yes, delete it!"
              confirmBtnBsStyle="danger"
            />
          )}

          {productId !== null && (
            <ProductDetails
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              id={productId}
            />
          )}

          {editProduct && (
            <Dialog open={!!editProduct} onClose={() => setEditProduct(null)}>
              <DialogTitle
                sx={{
                  textAlign: "center",
                  fontWeight: "700",
                  color: "#123C69",
                }}
              >
                Update Product
              </DialogTitle>
              <DialogContent sx={{ textAlign: "center" }}>
                <TextField
                  sx={{ width: "350px" }}
                  margin="normal"
                  label="Name"
                  value={editProduct.name}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, name: e.target.value })
                  }
                />
                <br />
                <TextField
                  sx={{ width: "350px" }}
                  margin="normal"
                  label="Description"
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      description: e.target.value,
                    })
                  }
                />
                <br />
                <TextField
                  sx={{ width: "350px" }}
                  margin="normal"
                  label="Category"
                  value={editProduct.category}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, category: e.target.value })
                  }
                />
                <br />
                <TextField
                  sx={{ width: "350px" }}
                  margin="normal"
                  label="Price"
                  value={editProduct.price}
                  onChange={(e) =>
                    setEditProduct({
                      ...editProduct,
                      price: Number(e.target.value),
                    })
                  }
                />
              </DialogContent>
              <DialogActions sx={{ justifyContent: "center", m: 2 }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    background: "#123C69",
                    "&:hover": { background: "#008ba3" },
                    mx: 2,
                  }}
                  onClick={() => setEditProduct(null)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleUpdate}
                  variant="contained"
                  color="primary"
                  sx={{
                    background: "#123C69",
                    "&:hover": { background: "#008ba3" },
                    mx: 2,
                  }}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Updating..." : "Save"}
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Box>
      </Box>
    </>
  );
}
