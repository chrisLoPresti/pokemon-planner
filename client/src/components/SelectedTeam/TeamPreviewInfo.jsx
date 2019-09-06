import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const TeamPreviewInfo = ({ setOpen, open }) => {
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          New To This Team Planner?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Scroll through the list of pokemon to form your team! If you don't
            want to scroll through the list manually, try searching by the
            Pokemon's name (english). You can clear your filters at any time or
            clear your search by clicking on the ghost.
          </DialogContentText>
          <ul>
            <DialogContentText id="alert-dialog-slide-description">
              <li>
                Drag Pokemon over each other to switch their order in your team
              </li>
              <li>
                If on pc:
                <br />
                {"\tDouble click a Pokemon or..."}
                <br />
                {"\tDrag them back into the list to remove them from your team"}
              </li>
              <li>
                If on mobile:
                <br />
                {"\tDrag them back into the list to remove them from your team"}
              </li>
            </DialogContentText>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TeamPreviewInfo;
