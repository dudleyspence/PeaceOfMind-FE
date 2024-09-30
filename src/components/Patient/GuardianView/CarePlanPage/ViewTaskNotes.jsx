import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ViewTaskNotes({ notes }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <>
      <svg
        onClick={handleOpen}
        className="h-5 w-5 min-w-5 min-h-5"
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:cc="http://creativecommons.org/ns#"
        xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
        xmlns:svg="http://www.w3.org/2000/svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
        xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
        aria-label="View Thread Details"
        fill="#262626"
        viewBox="0 0 48 48"
        version="1.1"
        id="svg10"
        sodipodi:docname="info.svg"
        inkscape:version="0.92.4 (5da689c313, 2019-01-14)"
      >
        <metadata id="metadata16">
          <rdf:RDF>
            <cc:Work rdf:about="">
              <dc:format>image/svg+xml</dc:format>
              <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage" />
              <dc:title></dc:title>
            </cc:Work>
          </rdf:RDF>
        </metadata>
        <defs id="defs14" />
        <sodipodi:namedview
          pagecolor="#ffffff"
          bordercolor="#666666"
          borderopacity="1"
          objecttolerance="10"
          gridtolerance="10"
          guidetolerance="10"
          inkscape:pageopacity="0"
          inkscape:pageshadow="2"
          inkscape:window-width="711"
          inkscape:window-height="480"
          id="namedview12"
          showgrid="false"
          inkscape:zoom="9.8333333"
          inkscape:cx="12"
          inkscape:cy="12"
          inkscape:window-x="0"
          inkscape:window-y="0"
          inkscape:window-maximized="0"
          inkscape:current-layer="svg10"
        />
        <path
          d="M24 48C10.8 48 0 37.2 0 24S10.8 0 24 0s24 10.8 24 24-10.8 24-24 24zm0-45C12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21S35.6 3 24 3z"
          id="path2"
        />
        <circle
          clip-rule="evenodd"
          cx="24"
          cy="14.8"
          fill-rule="evenodd"
          r="2.6"
          id="circle4"
        />
        <path
          d="M27.1 35.7h-6.2c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h6.2c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"
          id="path6"
        />
        <path
          d="M24 35.7c-.8 0-1.5-.7-1.5-1.5V23.5h-1.6c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5H24c.8 0 1.5.7 1.5 1.5v12.2c0 .8-.7 1.5-1.5 1.5z"
          id="path8"
        />
      </svg>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader className="relative m-0 block">
          <div className="flex flex-row items-center gap-5 justify-start mx-5 mt-3">
            <h3 className="underline font-bold text-[15px]">
              Additional Notes
            </h3>
          </div>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={handleOpen}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="p-0 px-5 pb-4">
          <Typography className="text-start justify-start font-normal">
            {notes ? notes : "No additional notes available."}
          </Typography>
        </DialogBody>
      </Dialog>
    </>
  );
}
