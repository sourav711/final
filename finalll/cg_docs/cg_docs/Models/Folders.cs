using System;
using System.Collections.Generic;

namespace cg_docs.Models
{
    public partial class Folders
    {
        public Folders()
        {
            Documents = new HashSet<Documents>();
        }

        public int FoldersId { get; set; }
        public string FolderName { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool? IsDeleted { get; set; }

        public Users CreatedByNavigation { get; set; }
        public ICollection<Documents> Documents { get; set; }
    }
}
