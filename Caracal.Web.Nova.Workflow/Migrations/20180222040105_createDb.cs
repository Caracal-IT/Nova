using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Caracal.Web.Nova.Workflow.Migrations
{
    public partial class createDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "workflow");

            migrationBuilder.CreateTable(
                name: "Workflows",
                schema: "workflow",
                columns: table => new
                {
                    Id = table.Column<Guid>(nullable: false),
                    DefinitionStr = table.Column<string>(type: "jsonb", nullable: true),
                    Name = table.Column<string>(maxLength: 255, nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    Version = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Workflows", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Workflows",
                schema: "workflow");
        }
    }
}
