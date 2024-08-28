import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";
import {
  clearAllExperienceErrors,
  deleteExperience,
  getAllExperience,
  resetExperienceSlice,
} from "@/store/slices/experienceSlice";

const ManageExperience = () => {
  const navigateTo = useNavigate();
  const handleReturnToDashboard = () => {
    navigateTo("/");
  };
  const { loading, experience, error, message } = useSelector(
    (state) => state.experience
  );
  console.log("hghgf", experience);
  
  const dispatch = useDispatch();

  const handleDeleteTimeline = (id) => {
    dispatch(deleteExperience(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllExperienceErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetExperienceSlice());
      dispatch(getAllExperience());
    }
  }, [dispatch, loading, error]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Tabs defaultValue="week">
        <TabsContent value="week">
          <Card>
            <CardHeader className="flex gap-4 sm:justify-between sm:flex-row sm:items-center">
              <CardTitle>Manage Your Timeline</CardTitle>
              <Button className="w-fit" onClick={handleReturnToDashboard}>
                Return to Dashboard
              </Button>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead className="md:table-cell">Description</TableHead>
                    <TableHead className="md:table-cell">From</TableHead>
                    <TableHead className="md:table-cell">To</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {experience.length > 0 ? (
                    experience.map((element) => {
                      return (
                        <TableRow className="bg-accent" key={element._id}>
                          <TableCell className="font-medium">
                            {element.title}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.description}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.experience.from}
                          </TableCell>
                          <TableCell className="md:table-cell">
                            {element.experience.to ? element.experience.to : "____"}
                          </TableCell>
                          <TableCell className="flex justify-end">
                            <button
                              className="border-red-600 border-2 rounded-full h-8 w-8 flex 
                              justify-center items-center text-red-600  hover:text-slate-50 hover:bg-red-600"
                              onClick={() => handleDeleteTimeline(element._id)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow className="text-2xl">
                      <TableCell>You have not added any timeline.</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageExperience;
