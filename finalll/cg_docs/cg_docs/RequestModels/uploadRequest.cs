using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace cg_docs.RequestModels
{
    public class uploadRequest
    {
        public int? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? FolderId { get; set; }
        public bool? IsDeleted { get; set; }
    }
}
